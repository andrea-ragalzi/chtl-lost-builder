from fastapi import Request
from ..repositories.user_repo import UserRepo
from ..repositories.session_repo import SessionRepo
from ..core.security import verify_password, new_session_id, now_utc, session_expiry, compute_ua_hash

class AuthService:
    def __init__(self, user_repo: UserRepo, session_repo: SessionRepo):
        self.user_repo = user_repo
        self.session_repo = session_repo

    async def login(self, identifier: str, password: str, request: Request) -> tuple[dict, str]:
        ident = identifier.strip().lower()
        user = await self.user_repo.find_by_email_or_nickname(ident)
        if not user or not user.get("is_active", True):
            raise ValueError("Invalid credentials")
        if not verify_password(password, user["password_hash"]):
            raise ValueError("Invalid credentials")

        sid = new_session_id()
        await self.session_repo.create(sid, {
            "user_id": str(user["_id"]),
            "created_at": now_utc(),
            "expires_at": session_expiry(),
            "ua_hash": compute_ua_hash(request),
            "ip": request.client.host if request.client else None,
        })
        await self.user_repo.set_last_login(str(user["_id"]), now_utc())
        return user, sid

    async def me_from_cookie(self, sid: str | None) -> dict | None:
        if not sid:
            return None
        sess = await self.session_repo.get(sid)
        if not sess:
            return None
        from bson import ObjectId
        return await self.user_repo.find_by_id(sess["user_id"])

    async def logout(self, sid: str | None):
        if sid:
            await self.session_repo.delete(sid)
