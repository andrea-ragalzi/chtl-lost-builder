from ..repositories.user_repo import UserRepo
from ..core.security import hash_password, now_utc

class UserService:
    def __init__(self, repo: UserRepo):
        self.repo = repo

    async def create_user(self, email: str, nickname: str, password: str) -> dict:
        email_lc = email.lower().strip()
        nickname = nickname.strip()
        nickname_lc = nickname.lower()
        if await self.repo.email_or_nickname_taken(email_lc, nickname_lc):
            raise ValueError("Email or nickname already in use")
        doc = {
            "email": email_lc,
            "password_hash": hash_password(password),
            "nickname": nickname,
            "nickname_lc": nickname_lc,
            "role": "user",
            "is_active": True,
            "email_verified": False,
            "created_at": now_utc(),
            "last_login": None,
        }
        doc["id"] = await self.repo.insert(doc)
        return doc
