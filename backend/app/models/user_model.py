from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime, timezone
from ..enums.user_role_enum import UserRole


class UserModel(BaseModel):
    id: Optional[str] = Field(default=None)
    email: EmailStr
    password_hash: str
    nickname: str
    role: UserRole = UserRole.USER
    is_active: bool = True
    email_verified: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: Optional[datetime] = None
    last_login: Optional[datetime] = None
