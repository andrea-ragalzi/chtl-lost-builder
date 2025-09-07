# app/schemas/auth_schema.py
from pydantic import BaseModel, Field

class LoginRequest(BaseModel):
    # Accept either email or nickname in a single "identifier" field.
    identifier: str = Field(min_length=2, max_length=255)
    password: str = Field(min_length=8, max_length=128)

class LoginResponse(BaseModel):
    # We return public user; cookie holds the session id.
    user: dict
