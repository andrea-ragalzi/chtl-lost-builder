from pydantic import BaseModel
from datetime import datetime

class SessionModel(BaseModel):
    id: str | None = None  # session id (cookie value)
    user_id: str
    created_at: datetime
    expires_at: datetime
    ua_hash: str | None = None
    ip: str | None = None
