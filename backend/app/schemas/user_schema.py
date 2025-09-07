# app/schemas/user_schema.py
from typing import Optional
from pydantic import BaseModel, EmailStr, Field

# Nickname: 2-32 chars, alnum underscore dot hyphen, no spaces, no @
NICK_RE = r"^[A-Za-z0-9_.-]{2,32}$"

class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)
    nickname: str = Field(pattern=NICK_RE)

class UserPublic(BaseModel):
    id: str
    email: EmailStr
    email_verified: bool
    nickname: str

class UserUpdateMe(BaseModel):
    nickname: Optional[str] = Field(default=None, pattern=NICK_RE)
