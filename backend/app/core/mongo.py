from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from .config import settings

_client: AsyncIOMotorClient | None = None
_db: AsyncIOMotorDatabase | None = None

def get_client() -> AsyncIOMotorClient:
    global _client
    if _client is None:
        _client = AsyncIOMotorClient(settings.MONGO_URL, uuidRepresentation="standard")
    return _client

def get_db() -> AsyncIOMotorDatabase:
    global _db
    if _db is None:
        _db = get_client()[settings.MONGO_DB]
    return _db

async def ensure_indexes():
    db = get_db()
    await db.users.create_index("email", unique=True, sparse=True)
    await db.users.create_index("nickname_lc", unique=True, sparse=True)
    await db.sessions.create_index("expires_at", expireAfterSeconds=0)

async def close_mongo():
    global _client, _db
    if _client:
        _client.close()
    _client = None
    _db = None
