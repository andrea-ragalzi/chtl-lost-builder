from passlib.context import CryptContext
_pwd = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(pw: str) -> str:
    return _pwd.hash(pw)

def verify_password(pw: str, pw_hash: str) -> bool:
    return _pwd.verify(pw, pw_hash)
