from datetime import datetime
from typing import TypedDict

class SessionModel(TypedDict, total=False):
    """Mongo document for 'sessions' collection."""
    _id: str           # session id (string, not ObjectId)
    user_id: str       # user ObjectId as str
    created_at: datetime
    expires_at: datetime
    user_agent_hash: str
    revoked: bool
