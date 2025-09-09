import pytest
from httpx import AsyncClient, ASGITransport
from fastapi import FastAPI
from app.routers import admin_router
from app.core.mongo import get_db

@pytest.mark.asyncio
async def test_admin_crud_users():
    # App minimale con solo router admin
    app = FastAPI()
    app.include_router(admin_router.router)

    # Usa il DB di test della suite
    app.dependency_overrides[get_db] = get_db

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://testserver") as ac:
        # CREATE
        r = await ac.post(
            "/admin/users",
            json={
                "email": "admtest@example.com",
                "nickname": "AdmTest",
                "password": "Passw0rd!",
                "role": "user",
                "is_active": True,
            },
        )
        assert r.status_code == 201, r.text
        user = r.json()
        uid = user["id"]

        # LIST
        r = await ac.get("/admin/users")
        assert r.status_code == 200, r.text
        data = r.json()
        assert any(u["id"] == uid for u in data["items"])

        # GET
        r = await ac.get(f"/admin/users/{uid}")
        assert r.status_code == 200, r.text
        assert r.json()["nickname"] == "AdmTest"

        # PATCH (il tuo endpoint risponde 204)
        r = await ac.patch(
            f"/admin/users/{uid}",
            json={"nickname": "AdmTest2", "is_active": True},
        )
        assert r.status_code in (200, 204), r.text

        # Verifica che il nickname sia cambiato
        r = await ac.get(f"/admin/users/{uid}")
        assert r.status_code == 200, r.text
        assert r.json()["nickname"] == "AdmTest2"

        # DELETE (204)
        r = await ac.delete(f"/admin/users/{uid}")
        assert r.status_code in (200, 204), r.text

        # GET dopo delete → 404
        r = await ac.get(f"/admin/users/{uid}")
        assert r.status_code == 404
