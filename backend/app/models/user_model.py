from datetime import datetime
from typing import Optional, TypedDict

class UserModel(TypedDict, total=False):
    """Mongo document for 'users' collection (raw dict for Motor)."""
    _id: str                 # ObjectId as hex string (we always convert to str)
    email: str
    email_verified: bool
    password_hash: str
    nickname: str
    locale: str
    created_at: datetime
    last_login: Optional[datetime]
    settings: dict
