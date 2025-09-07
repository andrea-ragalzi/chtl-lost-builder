from typing import Optional
from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime, timedelta, timezone


class SessionRepository:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.col = db["sessions"]

    async def create(
        self, session_id: str, user_id: str, ttl_minutes: int, user_agent_hash: str
    ) -> None:
        """Create a new session with an absolute expiration."""
        now = datetime.now(timezone.utc)
        doc = {
            "_id": session_id,
            "user_id": user_id,
            "created_at": now,
            "expires_at": now + timedelta(minutes=ttl_minutes),
            "user_agent_hash": user_agent_hash,
            "revoked": False,
        }
        await self.col.insert_one(doc)

    async def get(self, session_id: str) -> Optional[dict]:
        return await self.col.find_one({"_id": session_id, "revoked": False})

    async def revoke(self, session_id: str) -> None:
        await self.col.update_one({"_id": session_id}, {"$set": {"revoked": True}})
