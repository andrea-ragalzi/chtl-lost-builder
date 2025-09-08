from motor.motor_asyncio import AsyncIOMotorDatabase

class SessionRepo:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.col = db.sessions

    async def create(self, sid: str, doc: dict):
        doc["_id"] = sid
        await self.col.insert_one(doc)

    async def get(self, sid: str) -> dict | None:
        return await self.col.find_one({"_id": sid})

    async def delete(self, sid: str):
        await self.col.delete_one({"_id": sid})
