import pytest
from http.cookies import SimpleCookie
from app.core.config import settings

def _extract_cookie(set_cookie_header: str, name: str) -> str | None:
    if not set_cookie_header:
        return None
    sc = SimpleCookie()
    sc.load(set_cookie_header)
    m = sc.get(name)
    return m.value if m else None


@pytest.mark.asyncio
async def test_me_unauthorized(client):
    r = await client.get("/auth/me")
    assert r.status_code == 401


@pytest.mark.asyncio
async def test_register_login_me_logout(client):
    # Register
    r = await client.post(
        "/auth/register",
        json={"email": "user1@example.com", "nickname": "UserOne", "password": "Passw0rd!"},
    )
    assert r.status_code == 201, r.text

    # Login
    r = await client.post(
        "/auth/login",
        json={"identifier": "user1@example.com", "password": "Passw0rd!"},
    )
    assert r.status_code == 200, r.text

    # prendi il SID dal Set-Cookie
    set_cookie = r.headers.get("set-cookie", "")
    sid = _extract_cookie(set_cookie, settings.COOKIE_NAME)
    assert sid, f"Set-Cookie non contiene {settings.COOKIE_NAME}: {set_cookie}"

    # Me (forziamo header Cookie esplicito)
    r = await client.get("/auth/me", headers={"Cookie": f"{settings.COOKIE_NAME}={sid}"})
    assert r.status_code == 200, r.text
    me = r.json()
    assert me["nickname"] == "UserOne".lower()

    # Logout (header Cookie esplicito)
    r = await client.post("/auth/logout", headers={"Cookie": f"{settings.COOKIE_NAME}={sid}"})
    assert r.status_code in (200, 204)

    # Me dopo logout → 401
    r = await client.get("/auth/me", headers={"Cookie": f"{settings.COOKIE_NAME}={sid}"})
    assert r.status_code == 401


@pytest.mark.asyncio
async def test_login_with_nickname_case_insensitive(client):
    # Register
    r = await client.post(
        "/auth/register",
        json={"email": "user2@example.com", "nickname": "CaseNick", "password": "Passw0rd!"},
    )
    assert r.status_code == 201, r.text

    # Login con nickname minuscolo
    r = await client.post("/auth/login", json={"identifier": "casenick", "password": "Passw0rd!"})
    assert r.status_code == 200, r.text

    # prendi SID
    set_cookie = r.headers.get("set-cookie", "")
    sid = _extract_cookie(set_cookie, settings.COOKIE_NAME)
    assert sid, f"Set-Cookie non contiene {settings.COOKIE_NAME}: {set_cookie}"

    # Me con header Cookie
    r = await client.get("/auth/me", headers={"Cookie": f"{settings.COOKIE_NAME}={sid}"})
    assert r.status_code == 200, r.text
    assert r.json()["nickname"] == "CaseNick".lower()
