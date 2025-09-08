from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId

class UserRepo:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.col = db.users

    async def insert(self, doc: dict) -> str:
        res = await self.col.insert_one(doc)
        return str(res.inserted_id)

    async def find_by_email_or_nickname(self, ident_lc: str) -> dict | None:
        return await self.col.find_one({"$or":[{"email": ident_lc}, {"nickname_lc": ident_lc}]})

    async def find_by_id(self, id: str) -> dict | None:
        return await self.col.find_one({"_id": ObjectId(id)})

    async def set_last_login(self, id: str, ts):
        await self.col.update_one({"_id": ObjectId(id)}, {"$set": {"last_login": ts}})

    async def email_or_nickname_taken(self, email_lc: str, nickname_lc: str) -> bool:
        return bool(await self.col.find_one({"$or":[{"email": email_lc},{"nickname_lc": nickname_lc}]}))
