# app/services/auth_service.py
import hashlib
from fastapi import HTTPException, Request, Response, status
from motor.motor_asyncio import AsyncIOMotorDatabase
from ..repositories.user_repo import UserRepository
from ..repositories.session_repo import SessionRepository
from ..security.hashing import hash_password, verify_password
from ..core.session import new_session_id, set_session_cookie, clear_session_cookie, get_session_id_from_request
from ..core.settings import get_settings
from pymongo.errors import DuplicateKeyError

def _ua_hash(ua: str | None) -> str:
    """Very light UA binding to reduce cookie theft risk."""
    return hashlib.sha256((ua or "").encode("utf-8")).hexdigest()

class AuthService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.users = UserRepository(db)
        self.sessions = SessionRepository(db)
        self.settings = get_settings()

    async def register(self, email: str, password: str, nickname: str) -> dict:
        """Create user with unique email and nickname (case-insensitive)."""
        # App-level checks (fast path); DB still enforces with unique index.
        if await self.users.get_by_email(email):
            raise HTTPException(status_code=400, detail="Email already registered")
        if await self.users.is_nickname_taken(nickname):
            raise HTTPException(status_code=400, detail="Nickname already taken")

        try:
            user_id = await self.users.create(email, hash_password(password), nickname)
        except DuplicateKeyError:
            # Handles race conditions: turn DB error into a 400.
            raise HTTPException(status_code=400, detail="Email or nickname already taken")

        user = await self.users.get_by_id(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return self._public_user(user)


    async def login(self, request: Request, response: Response, identifier: str, password: str) -> dict:
        # Accept either email or nickname
        user = await self.users.get_by_identifier(identifier)
        if not user or not verify_password(password, user["password_hash"]):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

        sid = new_session_id()
        await self.sessions.create(
            session_id=sid,
            user_id=str(user["_id"]),
            ttl_minutes=self.settings.SESSION_TTL_MINUTES,
            user_agent_hash=_ua_hash(request.headers.get("user-agent")),
        )
        set_session_cookie(response, sid)
        await self.users.set_last_login(str(user["_id"]))
        return self._public_user(user)

    async def logout(self, request: Request, response: Response) -> None:
        sid = get_session_id_from_request(request)
        if sid:
            await self.sessions.revoke(sid)
        clear_session_cookie(response)

    async def get_current_user(self, request: Request) -> dict:
        sid = get_session_id_from_request(request)
        if not sid:
            raise HTTPException(status_code=401, detail="Not authenticated")

        sess = await self.sessions.get(sid)
        if not sess:
            raise HTTPException(status_code=401, detail="Session invalid or expired")

        if sess.get("user_agent_hash") != _ua_hash(request.headers.get("user-agent")):
            raise HTTPException(status_code=401, detail="Session mismatch")

        user = await self.users.get_by_id(sess["user_id"])
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return user

    def _public_user(self, user: dict) -> dict:
        return {
            "id": str(user["_id"]),
            "email": user["email"],
            "email_verified": bool(user.get("email_verified", False)),
            "nickname": user.get("nickname", ""),
        }
