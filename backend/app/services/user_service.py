from fastapi import HTTPException
from ..repositories.user_repo import UserRepository


class UserService:
    def __init__(self, users: UserRepository):
        self.users = users

    async def update_nickname(self, user_id: str, nickname: str) -> None:
        """Validate and change the current user's nickname."""
        if not nickname or len(nickname) < 2 or len(nickname) > 32:
            raise HTTPException(status_code=422, detail="Invalid nickname length")
        await self.users.update_nickname(user_id, nickname)
