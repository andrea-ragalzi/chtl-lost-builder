from fastapi import Request
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from .settings import get_settings

# We'll attach the DB to app.state at startup (see main.py).
def get_db(request: Request) -> AsyncIOMotorDatabase:
    """FastAPI dependency that returns the shared Motor database instance."""
    return request.app.state.db

def create_motor_client() -> AsyncIOMotorClient:
    """Create a Motor client using resolved settings."""
    settings = get_settings()
    return AsyncIOMotorClient(settings.resolved_mongo_uri)
