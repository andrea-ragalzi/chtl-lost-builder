# app/models/user_model.py
from datetime import datetime
from typing import Optional, TypedDict

class UserModel(TypedDict, total=False):
    """Mongo document for 'users' collection (raw dict for Motor)."""
    _id: str
    email: str
    email_verified: bool
    password_hash: str
    nickname: str          # display value (casing preserved)
    nickname_lc: str       # lower-cased nickname, for unique CI lookup
    locale: str
    created_at: datetime
    last_login: Optional[datetime]
    settings: dict
