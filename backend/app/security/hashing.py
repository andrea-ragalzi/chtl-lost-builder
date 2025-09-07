# app/security/hashing.py
from passlib.context import CryptContext

# Use Argon2 exclusively to avoid importing the bcrypt handler at all.
pwd_context = CryptContext(
    schemes=["argon2"],
    deprecated="auto",
)

def hash_password(password: str) -> str:
    """Hash a plain password (argon2)."""
    return pwd_context.hash(password)

def verify_password(plain_password: str, password_hash: str) -> bool:
    """Verify a password against an argon2 hash."""
    return pwd_context.verify(plain_password, password_hash)
