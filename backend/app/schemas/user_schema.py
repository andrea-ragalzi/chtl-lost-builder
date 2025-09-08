from pydantic import BaseModel, EmailStr

class UserOut(BaseModel):
    id: str
    email: EmailStr | None = None
    nickname: str
    role: str
    is_active: bool
    email_verified: bool
