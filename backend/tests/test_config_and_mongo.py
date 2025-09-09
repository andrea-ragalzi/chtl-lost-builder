import pytest
import app.core.mongo as mongo

@pytest.mark.asyncio
async def test_ensure_indexes_runs():
    # resetta i singletons per legare Motor al loop di questo test
    mongo._client = None
    mongo._db = None

    db = mongo.get_db()
    # sanity check: Mongo up
    await db.command("ping")

    # crea indici
    await mongo.ensure_indexes()

    # verifica che gli indici ci siano
    users_indexes = await db.users.index_information()
    assert any("email" in name for name in users_indexes), users_indexes
    assert any("nickname_lc" in name for name in users_indexes), users_indexes

    sessions_indexes = await db.sessions.index_information()
    # ci aspettiamo un indice TTL su expires_at
    assert any("expires_at" in repr(v.get("key")) for v in sessions_indexes.values()), sessions_indexes
