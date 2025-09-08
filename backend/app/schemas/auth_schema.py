from pydantic import BaseModel, EmailStr, Field

class RegisterIn(BaseModel):
    email: EmailStr
    nickname: str = Field(min_length=2, max_length=30)
    password: str = Field(min_length=8, max_length=128)

class LoginIn(BaseModel):
    identifier: str
    password: str = Field(min_length=8)
