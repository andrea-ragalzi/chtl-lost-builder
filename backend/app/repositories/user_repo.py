# app/repositories/user_repo.py
from typing import Any, Dict, Optional
from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime
from bson import ObjectId

def _norm_nick(n: str) -> str:
    """Normalize nickname for case-insensitive queries."""
    return n.lower()

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
            "nickname_lc": _norm_nick(nickname),
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

    async def get_by_nickname(self, nickname: str) -> Optional[dict]:
        """Find a user by nickname (case-insensitive via nickname_lc)."""
        return await self.col.find_one({"nickname_lc": _norm_nick(nickname)})

    async def get_by_identifier(self, identifier: str) -> Optional[dict]:
        """Resolve by email if identifier looks like one, otherwise by nickname."""
        if "@" in identifier:
            user = await self.get_by_email(identifier)
            if user:
                return user
        # fallback to nickname search
        return await self.get_by_nickname(identifier)

    async def is_nickname_taken(self, nickname: str, exclude_user_id: Optional[str] = None) -> bool:
        """Check if nickname is already in use (case-insensitive)."""
        # IMPORTANT: annotate as Dict[str, Any] to allow heterogeneous values.
        query: Dict[str, Any] = {"nickname_lc": _norm_nick(nickname)}
        if exclude_user_id:
            try:
                oid = ObjectId(exclude_user_id)
                # We add a $ne on _id; value is a dict -> needs Any typing above.
                query["_id"] = {"$ne": oid}
            except Exception:
                # If exclude_user_id is not a valid ObjectId, just ignore the filter.
                pass
        return await self.col.find_one(query) is not None

    async def get_by_id(self, user_id: str) -> Optional[dict]:
        try:
            oid = ObjectId(user_id)
        except Exception:
            return None
        return await self.col.find_one({"_id": oid})

    async def set_last_login(self, user_id: str) -> None:
        await self.col.update_one({"_id": ObjectId(user_id)}, {"$set": {"last_login": datetime.utcnow()}})

    async def update_nickname(self, user_id: str, nickname: str) -> None:
        """Update both display and normalized nickname."""
        await self.col.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": {"nickname": nickname, "nickname_lc": _norm_nick(nickname)}},
        )
