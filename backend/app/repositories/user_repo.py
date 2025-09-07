from typing import Optional
from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime
from bson import ObjectId


class UserRepository:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.col = db["users"]

    async def create(self, email: str, password_hash: str, nickname: str) -> str:
        """Insert user and return its id as string."""
        doc = {
            "email": email.lower(),
            "email_verified": False,
            "password_hash": password_hash,
            "nickname": nickname,
            "locale": "it-IT",
            "created_at": datetime.utcnow(),
            "last_login": None,
            "settings": {"theme": "system"},
        }
        res = await self.col.insert_one(doc)
        return str(res.inserted_id)

    async def get_by_email(self, email: str) -> Optional[dict]:
        """Find a user by email (lowercased)."""
        return await self.col.find_one({"email": email.lower()})

    async def get_by_id(self, user_id: str) -> Optional[dict]:
        try:
            oid = ObjectId(user_id)
        except Exception:
            return None
        return await self.col.find_one({"_id": oid})

    async def set_last_login(self, user_id: str) -> None:
        await self.col.update_one(
            {"_id": ObjectId(user_id)}, {"$set": {"last_login": datetime.utcnow()}}
        )

    async def update_nickname(self, user_id: str, nickname: str) -> None:
        await self.col.update_one(
            {"_id": ObjectId(user_id)}, {"$set": {"nickname": nickname}}
        )
