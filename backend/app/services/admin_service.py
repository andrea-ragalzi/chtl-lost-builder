from fastapi import HTTPException, status
from pymongo.errors import DuplicateKeyError
from ..repositories.user_repo import UserRepository
from ..repositories.session_repo import SessionRepository
from ..schemas.admin_schema import AdminUserUpdate, AdminUserCreate
from ..security.hashing import hash_password

class AdminService:
    """Admin-only operations on users with guardrails (no last-admin removal)."""
    def __init__(self, users: UserRepository, sessions: SessionRepository):
        self.users = users
        self.sessions = sessions

    async def create_user(self, payload: AdminUserCreate) -> dict:
        # Pre-checks (DB still enforces unique indexes)
        if await self.users.is_email_taken(payload.email):
            raise HTTPException(status_code=400, detail="Email already registered")
        if await self.users.is_nickname_taken(payload.nickname):
            raise HTTPException(status_code=400, detail="Nickname already taken")
        try:
            user_id = await self.users.create(
                email=payload.email,
                password_hash=hash_password(payload.password),
                nickname=payload.nickname,
                role=payload.role,
                is_active=payload.is_active,
            )
        except DuplicateKeyError:
            raise HTTPException(status_code=400, detail="Email or nickname already taken")

        doc = await self.users.get_by_id(user_id)
        if not doc:
            raise HTTPException(status_code=500, detail="User creation failed")
        return {
            "id": str(doc["_id"]),
            "email": doc["email"],
            "email_verified": bool(doc.get("email_verified", False)),
            "nickname": doc.get("nickname", ""),
            "role": doc.get("role", "user"),
            "is_active": doc.get("is_active", True),
            "created_at": doc.get("created_at"),
        }
    async def list_users(self, q: str | None, role: str | None, is_active: bool | None, limit: int, skip: int):
        return await self.users.list_users(q=q, role=role, is_active=is_active, limit=limit, skip=skip)

    async def get_user(self, user_id: str) -> dict:
        doc = await self.users.get_public_by_id(user_id)
        if not doc:
            raise HTTPException(status_code=404, detail="User not found")
        return doc

    async def patch_user(self, target_user_id: str, payload: AdminUserUpdate, actor_id: str) -> None:
        changed = False

        # Role changes with "last admin" protection
        if payload.role is not None:
            target = await self.users.get_by_id(target_user_id)
            if not target:
                raise HTTPException(status_code=404, detail="User not found")
            if target.get("role") == "admin" and payload.role == "user":
                admins = await self.users.count_admins()
                if admins <= 1:
                    raise HTTPException(status_code=409, detail="Cannot demote the last admin")
            ok = await self.users.set_role(target_user_id, payload.role)
            if not ok:
                raise HTTPException(status_code=404, detail="User not found")
            changed = True

        if payload.is_active is not None:
            ok = await self.users.update_is_active(target_user_id, payload.is_active)
            if not ok:
                raise HTTPException(status_code=404, detail="User not found")
            changed = True
            if not payload.is_active:
                await self.sessions.revoke_all_for_user(target_user_id)

        if payload.nickname is not None:
            # Uniqueness enforced by DB; try/catch for race
            if await self.users.is_nickname_taken(payload.nickname, exclude_user_id=target_user_id):
                raise HTTPException(status_code=400, detail="Nickname already taken")
            try:
                await self.users.update_nickname(target_user_id, payload.nickname)
            except DuplicateKeyError:
                raise HTTPException(status_code=400, detail="Nickname already taken")
            changed = True

        if payload.email_verified is not None:
            from bson import ObjectId
            await self.users.col.update_one({"_id": ObjectId(target_user_id)}, {"$set": {"email_verified": payload.email_verified}})
            changed = True

        if not changed:
            # No-op, but return 204 anyway to keep it idempotent
            return

    async def delete_user(self, target_user_id: str, actor_id: str) -> None:
        # Protect last admin from deletion
        target = await self.users.get_by_id(target_user_id)
        if not target:
            raise HTTPException(status_code=404, detail="User not found")
        if target.get("role") == "admin":
            admins = await self.users.count_admins()
            if admins <= 1:
                raise HTTPException(status_code=409, detail="Cannot delete the last admin")

        await self.sessions.delete_all_for_user(target_user_id)
        ok = await self.users.delete_user(target_user_id)
        if not ok:
            raise HTTPException(status_code=404, detail="User not found")
