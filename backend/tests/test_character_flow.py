import pytest
from http.cookies import SimpleCookie
import app.core.mongo as mongo_mod
from app.core.config import settings

COOKIE_NAME = getattr(settings, "COOKIE_NAME", "session")


def _extract_cookie(set_cookie_header: str, name: str) -> str | None:
    if not set_cookie_header:
        return None
    sc = SimpleCookie()
    sc.load(set_cookie_header)
    morsel = sc.get(name)
    return morsel.value if morsel else None


async def _register(client, email: str, nickname: str, password: str = "Passw0rd!"):
    r = await client.post(
        "/auth/register",
        json={"email": email, "nickname": nickname, "password": password},
    )
    assert r.status_code == 201, r.text


async def _login(client, identifier: str, password: str = "Passw0rd!"):
    r = await client.post(
        "/auth/login",
        json={"identifier": identifier, "password": password},
    )
    assert r.status_code == 200, r.text
    sid = _extract_cookie(r.headers.get("set-cookie", ""), COOKIE_NAME)
    assert sid, "Missing auth cookie"
    return sid


async def _auth_headers(sid: str) -> dict:
    return {"Cookie": f"{COOKIE_NAME}={sid}"}


@pytest.mark.asyncio
async def test_character_unauthorized(client):
    r = await client.post("/characters", json={"name": "NoAuth"})
    assert r.status_code == 401


@pytest.mark.asyncio
async def test_character_crud_user_isolation(client):
    # User A register + login
    await _register(client, "userA@example.com", "UserA")
    sid_a = await _login(client, "userA@example.com")

    # Create character A1
    r = await client.post(
        "/characters",
        json={"name": "Autumn Leaf", "concept": "Escaped dream"},
        headers=await _auth_headers(sid_a),
    )
    assert r.status_code == 201, r.text
    char_a1 = r.json()
    char_a1_id = char_a1["id"]

    # List (User A)
    r = await client.get("/characters", headers=await _auth_headers(sid_a))
    assert r.status_code == 200
    assert any(c["id"] == char_a1_id for c in r.json())

    # Get (User A)
    r = await client.get(f"/characters/{char_a1_id}", headers=await _auth_headers(sid_a))
    assert r.status_code == 200
    assert r.json()["name"] == "Autumn Leaf"

    # Update (User A)
    r = await client.patch(
        f"/characters/{char_a1_id}",
        json={"concept": "Mended dream", "clarity": 8},
        headers=await _auth_headers(sid_a),
    )
    assert r.status_code == 200
    assert r.json()["concept"] == "Mended dream"
    assert r.json()["clarity"] == 8

    # Empty update -> 400
    r = await client.patch(
        f"/characters/{char_a1_id}", json={}, headers=await _auth_headers(sid_a)
    )
    assert r.status_code == 400

    # User B register + login
    await _register(client, "userB@example.com", "UserB")
    sid_b = await _login(client, "userB@example.com")

    # User B cannot read User A character
    r = await client.get(f"/characters/{char_a1_id}", headers=await _auth_headers(sid_b))
    assert r.status_code == 404

    # User B cannot update User A character
    r = await client.patch(
        f"/characters/{char_a1_id}",
        json={"concept": "Hack"},
        headers=await _auth_headers(sid_b),
    )
    assert r.status_code == 404

    # User B cannot delete User A character
    r = await client.delete(
        f"/characters/{char_a1_id}", headers=await _auth_headers(sid_b)
    )
    assert r.status_code == 404

    # User B list does NOT include A1
    r = await client.get("/characters", headers=await _auth_headers(sid_b))
    assert r.status_code == 200
    assert all(c["id"] != char_a1_id for c in r.json())

    # User A deletes own character
    r = await client.delete(
        f"/characters/{char_a1_id}", headers=await _auth_headers(sid_a)
    )
    assert r.status_code == 204

    # Fetch after delete -> 404
    r = await client.get(f"/characters/{char_a1_id}", headers=await _auth_headers(sid_a))
    assert r.status_code == 404


@pytest.mark.asyncio
async def test_character_admin_capabilities(client):
    # Regular user
    await _register(client, "user20@example.com", "User20")
    sid_user = await _login(client, "user20@example.com")

    # Create a character for user20
    r = await client.post(
        "/characters",
        json={"name": "User20 Char"},
        headers=await _auth_headers(sid_user),
    )
    assert r.status_code == 201, r.text
    user_char_id = r.json()["id"]

    # Admin user
    await _register(client, "admin1@example.com", "AdminGuy")
    sid_admin = await _login(client, "admin1@example.com")

    # Promote to ADMIN (update DB directly)
    db = mongo_mod._db
    assert db is not None, "Test DB not initialized"
    await db["users"].update_one(
        {"email": "admin1@example.com"}, {"$set": {"role": "admin"}}
    )

    # Admin can list ALL (should see at least the user2 character)
    r = await client.get("/characters", headers=await _auth_headers(sid_admin))
    assert r.status_code == 200
    all_chars = r.json()
    assert any(c["id"] == user_char_id for c in all_chars)

    # Admin can get other user's character
    r = await client.get(
        f"/characters/{user_char_id}", headers=await _auth_headers(sid_admin)
    )
    assert r.status_code == 200

    # Admin can update other user's character
    r = await client.patch(
        f"/characters/{user_char_id}",
        json={"concept": "Admin Updated"},
        headers=await _auth_headers(sid_admin),
    )
    assert r.status_code == 200
    assert r.json()["concept"] == "Admin Updated"

    # Admin can delete other user's character
    r = await client.delete(
        f"/characters/{user_char_id}", headers=await _auth_headers(sid_admin)
    )
    assert r.status_code == 204

    # Confirm deleted
    r = await client.get(
        f"/characters/{user_char_id}", headers=await _auth_headers(sid_admin)
    )
    assert r.status_code == 404