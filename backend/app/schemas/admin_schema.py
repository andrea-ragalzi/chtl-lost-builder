# app/schemas/admin_schema.py
from typing import Optional, Literal
from pydantic import BaseModel, EmailStr, Field

class AdminUserCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)
    nickname: str = Field(pattern=r"^[A-Za-z0-9_.-]{2,32}$")
    role: Literal["user", "admin"] = "user"
    is_active: bool = True

class AdminUserUpdate(BaseModel):
    role: Optional[Literal["user", "admin"]] = None
    is_active: Optional[bool] = None
    nickname: Optional[str] = Field(default=None, pattern=r"^[A-Za-z0-9_.-]{2,32}$")
    email_verified: Optional[bool] = None

class AdminUserQuery(BaseModel):
    query: Optional[str] = None
    role: Optional[Literal["user", "admin"]] = None
    is_active: Optional[bool] = None
