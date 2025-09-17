from typing import Optional, Dict, Any
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId


class UserRepo:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.col = db["users"]

    async def insert(self, doc: Dict[str, Any]) -> str:
        res = await self.col.insert_one(doc)
        return str(res.inserted_id)

    async def find_by_email_or_nickname(self, ident_lc: str) -> Optional[dict]:
        return await self.col.find_one(
            {"$or": [{"email": ident_lc}, {"nickname": ident_lc}]}
        )

    async def find_by_id(self, id: str) -> Optional[dict]:
        try:
            oid = ObjectId(id)
        except Exception:
            return None
        return await self.col.find_one({"_id": oid})

    async def email_or_nickname_taken(self, email_lc: str, nickname_lc: str) -> bool:
        doc = await self.col.find_one(
            {"$or": [{"email": email_lc}, {"nickname": nickname_lc}]},
            projection={"_id": 1},
        )
        return doc is not None

    async def update_by_id(self, id: str, update: Dict[str, Any]) -> None:
        if not update:
            return
        try:
            oid = ObjectId(id)
        except Exception:
            return
        await self.col.update_one({"_id": oid}, {"$set": update})

    async def delete_by_id(self, id: str) -> None:
        try:
            oid = ObjectId(id)
        except Exception:
            return
        await self.col.delete_one({"_id": oid})
