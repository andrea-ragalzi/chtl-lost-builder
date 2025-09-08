# tests/test_auth_login.py
import pytest
from httpx import AsyncClient

pytestmark = pytest.mark.asyncio

BASE = "/api"

async def register(client: AsyncClient, email: str, password: str, nickname: str):
    r = await client.post(f"{BASE}/auth/register", json={
        "email": email, "password": password, "nickname": nickname
    })
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["email"] == email.lower()
    return data

async def login(client: AsyncClient, identifier: str, password: str):
    r = await client.post(f"{BASE}/auth/login", json={
        "identifier": identifier, "password": password
    })
    assert r.status_code == 200, r.text
    # Cookie must be set
    set_cookie = r.headers.get("set-cookie", "")
    assert "session_id=" in set_cookie
    return r.json()

async def auth_me(client: AsyncClient, code=200):
    r = await client.get(f"{BASE}/auth/me")
    assert r.status_code == code, r.text
    return r

async def users_me(client: AsyncClient, code=200):
    r = await client.get(f"{BASE}/users/me")
    assert r.status_code == code, r.text
    return r

async def logout(client: AsyncClient, code=204):
    r = await client.post(f"{BASE}/auth/logout")
    assert r.status_code == code, r.text
    return r

async def test_register_login_cookie_me_logout(client: AsyncClient):
    # Register a user
    await register(client, "alice@example.com", "Passw0rd!", "Alice_01")

    # Login with email
    data = await login(client, "alice@example.com", "Passw0rd!")
    assert data["user"]["email"] == "alice@example.com"
    assert data["user"]["role"] in ("user", "admin")
    assert data["user"]["is_active"] is True

    # The client now has the cookie; /auth/me and /users/me must work
    r = await auth_me(client)
    me = r.json()
    assert me["email"] == "alice@example.com"

    r = await users_me(client)
    up = r.json()
    assert up["email"] == "alice@example.com"
    assert up["is_active"] is True

    # Logout clears cookie; /auth/me must become 401
    await logout(client)
    await auth_me(client, code=401)

async def test_login_with_nickname(client: AsyncClient):
    # Register another user
    await register(client, "bob@example.com", "Passw0rd!", "BobTheLost")

    # Login using nickname (not email)
    data = await login(client, "BobTheLost", "Passw0rd!")
    assert data["user"]["nickname"] == "BobTheLost"

    # Sanity: /users/me reachable
    r = await users_me(client)
    assert r.json()["nickname"] == "BobTheLost"

async def test_wrong_password_fails(client: AsyncClient):
    # Try wrong password
    r = await client.post(f"{BASE}/auth/login", json={
        "identifier": "bob@example.com", "password": "bad"
    })
    assert r.status_code in (400, 401)
