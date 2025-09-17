# tests/conftest.py
import os
import uuid
import pytest_asyncio
from httpx import AsyncClient, ASGITransport
from motor.motor_asyncio import AsyncIOMotorClient

from app.core.config import settings
import app.core.mongo as mongo_mod


@pytest_asyncio.fixture(scope="session", autouse=True)
async def test_db_name():
    """
    Prepare unique test database name and ensure full cleanup after the test session.
    """
    mongo_url = (
        os.getenv("MONGO_TEST_URL")
        or getattr(settings, "MONGO_TEST_URL", None)
        or getattr(settings, "MONGO_URL", None)
        or getattr(settings, "MONGO_URI", None)
    )
    if not mongo_url:
        raise RuntimeError("No Mongo test URL configured")

    base_db = (
        os.getenv("MONGO_TEST_DB")
        or getattr(settings, "MONGO_TEST_DB", None)
        or "chtl_test"
    )

    name = f"{base_db}_{uuid.uuid4().hex[:8]}"

    # Export to environment + mutate settings for the app import
    os.environ["MONGO_URL"] = mongo_url
    os.environ["MONGO_DB"] = name
    settings.MONGO_URL = mongo_url  # align naming
    settings.MONGO_DB = name

    yield name

    # Close app client if still open
    await mongo_mod.close_mongo()

    # Drop database with a fresh client (ensures deletion even if app client was closed)
    client = AsyncIOMotorClient(mongo_url, uuidRepresentation="standard")
    await client.drop_database(name)
    client.close()


@pytest_asyncio.fixture
async def client():
    """
    ASGI test client fixture.
    Resets mongo singleton before importing the application so each test function
    sees a clean database state.
    """
    mongo_mod._client = None
    mongo_mod._db = None

    from app.main import app  # import after env + reset

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://testserver") as ac:
        yield ac
