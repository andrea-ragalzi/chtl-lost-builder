from typing import Optional, Dict, Any, List
from motor.motor_asyncio import AsyncIOMotorDatabase
from ..core.utils import oid_or_none


class CharacterRepo:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.col = db["characters"]

    async def insert(self, doc: Dict[str, Any]) -> str:
        # Ensure owner_id stored as string
        if doc.get("owner_id") is not None:
            doc["owner_id"] = str(doc["owner_id"])
        res = await self.col.insert_one(doc)
        return str(res.inserted_id)

    async def find_by_id(
        self, char_id: str, owner_id: Optional[str] = None
    ) -> Optional[dict]:
        oid = oid_or_none(char_id)
        if not oid:
            return None
        query: Dict[str, Any] = {"_id": oid}
        if owner_id is not None:
            query["owner_id"] = str(owner_id)
        return await self.col.find_one(query)

    async def list_by_owner(
        self, owner_id: str, skip: int = 0, limit: int = 50
    ) -> List[dict]:
        cursor = (
            self.col.find({"owner_id": str(owner_id)})
            .skip(skip)
            .limit(limit)
            .sort("created_at", 1)
        )
        return [d async for d in cursor]

    async def list_all(self, skip: int = 0, limit: int = 50) -> List[dict]:
        cursor = self.col.find({}).skip(skip).limit(limit).sort("created_at", 1)
        return [d async for d in cursor]

    async def update_by_id(
        self, char_id: str, owner_id: Optional[str], update: Dict[str, Any]
    ) -> bool:
        if not update:
            return False
        oid = oid_or_none(char_id)
        if not oid:
            return False
        query: Dict[str, Any] = {"_id": oid}
        if owner_id is not None:
            query["owner_id"] = str(owner_id)
        res = await self.col.update_one(query, {"$set": update})
        return res.matched_count == 1

    async def delete_by_id(self, char_id: str, owner_id: Optional[str]) -> bool:
        oid = oid_or_none(char_id)
        if not oid:
            return False
        query: Dict[str, Any] = {"_id": oid}
        if owner_id is not None:
            query["owner_id"] = str(owner_id)
        res = await self.col.delete_one(query)
        return res.deleted_count == 1
