# app/services/user_service.py
import re
from fastapi import HTTPException
from ..repositories.user_repo import UserRepository
from pymongo.errors import DuplicateKeyError

NICK_RE = re.compile(r"^[A-Za-z0-9_.-]{2,32}$")

class UserService:
    def __init__(self, users: UserRepository):
        self.users = users

    async def update_nickname(self, user_id: str, nickname: str) -> None:
        """Validate nickname and ensure uniqueness (case-insensitive)."""
        if not NICK_RE.fullmatch(nickname or ""):
            raise HTTPException(status_code=422, detail="Invalid nickname")
        if await self.users.is_nickname_taken(nickname, exclude_user_id=user_id):
            raise HTTPException(status_code=400, detail="Nickname already taken")
        try:
            await self.users.update_nickname(user_id, nickname)
        except DuplicateKeyError:
            # In case of a race after the pre-check
            raise HTTPException(status_code=400, detail="Nickname already taken")
