import pytest
from http.cookies import SimpleCookie
from app.core.config import settings
from app.core.mongo import get_db
from datetime import datetime, timedelta, timezone

def _sid_from_set_cookie(h, name):
    sc = SimpleCookie()
    sc.load(h or "")
    m = sc.get(name)
    return m.value if m else None

@pytest.mark.asyncio
async def test_register_rejects_invalid_email(client):
    r = await client.post("/auth/register", json={
        "email": "not-an-email",
        "nickname": "BadMail",
        "password": "Passw0rd!",
    })
    assert r.status_code == 422

@pytest.mark.asyncio
async def test_register_rejects_short_password(client):
    r = await client.post("/auth/register", json={
        "email": "short@example.com",
        "nickname": "Shorty",
        "password": "short",
    })
    assert r.status_code == 422

@pytest.mark.asyncio
async def test_register_uniqueness_email_case_insensitive(client):
    r = await client.post("/auth/register", json={
        "email": "Dup@Example.com", "nickname": "DupNick1", "password":"Passw0rd!"
    })
    assert r.status_code == 201, r.text
    r = await client.post("/auth/register", json={
        "email": "dup@example.com", "nickname": "DupNick2", "password":"Passw0rd!"
    })
    assert r.status_code == 400
    assert "email" in r.text.lower() or "in use" in r.text.lower()

@pytest.mark.asyncio
async def test_register_uniqueness_nickname_case_insensitive(client):
    r = await client.post("/auth/register", json={
        "email": "nick1@example.com", "nickname": "SameNick", "password":"Passw0rd!"
    })
    assert r.status_code == 201
    r = await client.post("/auth/register", json={
        "email": "nick2@example.com", "nickname": "samenick", "password":"Passw0rd!"
    })
    assert r.status_code == 400
    assert "nickname" in r.text.lower()

@pytest.mark.asyncio
async def test_login_with_wrong_password(client):
    await client.post("/auth/register", json={
        "email":"wrong@example.com", "nickname":"WrongPw", "password":"Passw0rd!"
    })
    r = await client.post("/auth/login", json={
        "identifier":"wrong@example.com", "password":"WrongPass!"
    })
    assert r.status_code == 401
    assert "invalid" in r.text.lower()

@pytest.mark.asyncio
async def test_login_unknown_user(client):
    r = await client.post("/auth/login", json={
        "identifier":"nouser@example.com", "password":"Passw0rd!"
    })
    assert r.status_code == 401

@pytest.mark.asyncio
async def test_login_with_uppercase_email_and_lower_nickname(client):
    await client.post("/auth/register", json={
        "email": "casemix@example.com", "nickname":"MiXeD", "password":"Passw0rd!"
    })
    r = await client.post("/auth/login", json={
        "identifier":"CASEMIX@EXAMPLE.COM", "password":"Passw0rd!"
    })
    assert r.status_code == 200
    sid = _sid_from_set_cookie(r.headers.get("set-cookie",""), settings.COOKIE_NAME)
    assert sid
    r = await client.get("/auth/me", headers={"Cookie": f"{settings.COOKIE_NAME}={sid}"})
    assert r.status_code == 200
    r = await client.post("/auth/login", json={"identifier":"mixed", "password":"Passw0rd!"})
    assert r.status_code == 200

@pytest.mark.asyncio
async def test_inactive_user_cannot_login(client):
    await client.post("/auth/register", json={
        "email":"inactive@example.com", "nickname":"Inactive", "password":"Passw0rd!"
    })
    db = get_db()
    await db.users.update_one({"email":"inactive@example.com"}, {"$set":{"is_active": False}})
    r = await client.post("/auth/login", json={
        "identifier":"inactive@example.com", "password":"Passw0rd!"
    })
    assert r.status_code in (400, 401, 403)

@pytest.mark.asyncio
async def test_logout_without_cookie_is_ok(client):
    r = await client.post("/auth/logout")
    assert r.status_code in (200, 204)

@pytest.mark.asyncio
async def test_login_payload_validation(client):
    r = await client.post("/auth/login", json={"identifier":"x@y", "password":"123"})
    assert r.status_code == 401

@pytest.mark.asyncio
async def test_session_expired_denies_me(client):
    await client.post("/auth/register", json={
        "email":"ttl@example.com", "nickname":"TTL", "password":"Passw0rd!"
    })
    r = await client.post("/auth/login", json={
        "identifier":"ttl@example.com", "password":"Passw0rd!"
    })
    assert r.status_code == 200
    sid = _sid_from_set_cookie(r.headers.get("set-cookie",""), settings.COOKIE_NAME)
    assert sid
    # scade la sessione
    db = get_db()
    await db.sessions.update_one({"_id": sid}, {"$set": {"expires_at": datetime.now(timezone.utc) - timedelta(seconds=1)}})
    r = await client.get("/auth/me", headers={"Cookie": f"{settings.COOKIE_NAME}={sid}"})
    assert r.status_code == 401
