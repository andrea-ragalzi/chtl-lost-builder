from passlib.context import CryptContext

_pwd = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    """Hash a password with bcrypt."""
    return _pwd.hash(password)


def verify_password(plain: str, hashed: str) -> bool:
    """Verify a bcrypt password."""
    return _pwd.verify(plain, hashed)
