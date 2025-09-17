from pydantic import BaseModel, EmailStr, Field

class RegisterReq(BaseModel):
    email: EmailStr
    nickname: str = Field(min_length=2, max_length=30)
    password: str = Field(min_length=8, max_length=128)

class LoginReq(BaseModel):
    identifier: str
    password: str