# tests/conftest.py
import os
import uuid
import pytest_asyncio
from httpx import AsyncClient, ASGITransport

from app.core.config import settings

# usa il modulo corretto: mongo.py
import app.core.mongo as mongo_mod
from motor.motor_asyncio import AsyncIOMotorClient


@pytest_asyncio.fixture(scope="session", autouse=True)
async def test_db_name():
    """
    Prepara variabili d'ambiente per i test e cleanup finale.
    Non crea il client Motor qui (evitiamo loop mismatch).
    """
    mongo_url = os.getenv("MONGO_TEST_URL") or settings.MONGO_TEST_URL or settings.MONGO_URL
    base_db = os.getenv("MONGO_TEST_DB") or settings.MONGO_TEST_DB or "chtl_test"

    name = f"{base_db}_{uuid.uuid4().hex[:8]}"

    os.environ["MONGO_URL"] = mongo_url
    os.environ["MONGO_DB"] = name
    settings.MONGO_URL = mongo_url
    settings.MONGO_DB = name

    yield name

    # Cleanup con un NUOVO client (nel loop dei test)
    client = AsyncIOMotorClient(settings.MONGO_URL, uuidRepresentation="standard")
    await client.drop_database(name)
    client.close()


@pytest_asyncio.fixture
async def client(test_db_name):
    """
    Client ASGI end-to-end.
    Reset degli singleton Mongo per forzare la creazione del client
    all'interno del loop dell'app (evita 'Future attached to a different loop').
    """
    # Reset singleton Motor nella tua app
    mongo_mod._client = None
    mongo_mod._db = None

    # Importa l'app SOLO ora, dopo aver settato le env e resettato il client
    from app.main import app

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://testserver") as ac:
        yield ac
