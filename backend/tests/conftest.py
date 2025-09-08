# tests/conftest.py
import os
import uuid
import importlib
import pytest
import pytest_asyncio

from httpx import AsyncClient
try:
    # httpx >= 0.27
    from httpx import ASGITransport
    HAS_ASGI_TRANSPORT = True
except Exception:
    HAS_ASGI_TRANSPORT = False

from asgi_lifespan import LifespanManager

@pytest.fixture(scope="session")
def test_db_name() -> str:
    return f"chtl_test_{uuid.uuid4().hex}"

@pytest.fixture(scope="session", autouse=True)
def _setup_env(test_db_name: str):
    # Use local Mongo for tests (adjust if needed)
    os.environ["LOCAL_RUN"] = "true"
    os.environ["MONGO_URI_LOCAL"] = os.environ.get("MONGO_URI_LOCAL", "mongodb://localhost:27017")
    os.environ["MONGO_DB"] = test_db_name

    # Ensure cookies work in tests/dev (not HTTPS)
    os.environ["COOKIE_SECURE"] = "false"
    os.environ["COOKIE_SAMESITE"] = "lax"
    os.environ["COOKIE_DOMAIN"] = ""  # no explicit domain
    yield

@pytest.fixture(scope="session")
def app():
    # Reload app with fresh settings
    from app.core.config import get_settings
    get_settings.cache_clear()
    import app.main as app_main
    importlib.reload(app_main)
    return app_main.app

@pytest_asyncio.fixture(scope="session")
async def client(app):
    # Run lifespan and return a client that keeps cookies between requests
    if HAS_ASGI_TRANSPORT:
        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as ac:
            yield ac
    else:
        async with LifespanManager(app):
            async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
                yield ac
    # Teardown: drop the test DB
    app.state.client.drop_database(app.state.db.name)
    app.state.client.close()
