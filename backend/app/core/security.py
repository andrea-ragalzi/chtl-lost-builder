import hashlib
import secrets
from datetime import datetime, timedelta, timezone
from passlib.context import CryptContext
from fastapi import Request
from ..core.config import settings

pwd_ctx = CryptContext(schemes=["argon2"], deprecated="auto")


def hash_password(p: str) -> str:
    return pwd_ctx.hash(p)


def verify_password(p: str, hashed: str) -> bool:
    return pwd_ctx.verify(p, hashed)


def now_utc() -> datetime:
    return datetime.now(timezone.utc)


def new_session_id() -> str:
    return secrets.token_urlsafe(32)


def compute_ua_hash(req: Request) -> str:
    ua = req.headers.get("user-agent", "")
    return hashlib.sha256(ua.encode()).hexdigest()


def session_expiry() -> datetime:
    return now_utc() + timedelta(hours=settings.SESSION_TTL_HOURS)
