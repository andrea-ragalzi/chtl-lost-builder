from typing import Optional
from pydantic import BaseModel, EmailStr, Field

class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)
    nickname: str = Field(min_length=2, max_length=32)

class UserPublic(BaseModel):
    id: str
    email: EmailStr
    email_verified: bool
    nickname: str

class UserUpdateMe(BaseModel):
    nickname: Optional[str] = Field(default=None, min_length=2, max_length=32)
