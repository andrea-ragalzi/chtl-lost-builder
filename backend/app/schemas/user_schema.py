from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Iterable, List
from ..enums.user_role_enum import UserRole
from ..models.user_model import UserModel  # <-- aggiunto


class UserCreateReq(BaseModel):
    email: EmailStr
    nickname: str = Field(min_length=2, max_length=30)
    password: str = Field(min_length=8, max_length=128)


class UserUpdateReq(BaseModel):
    nickname: Optional[str] = Field(None, min_length=2, max_length=30)
    password: Optional[str] = Field(None, min_length=8, max_length=128)
    role: Optional[UserRole] = None
    is_active: Optional[bool] = None
    email_verified: Optional[bool] = None


class UserRes(BaseModel):
    id: str
    email: EmailStr
    nickname: str
    role: UserRole
    is_active: bool
    email_verified: bool

    @classmethod
    def from_model(cls, user: UserModel) -> "UserRes":
        return cls(
            id=str(user.id),
            email=user.email,
            nickname=user.nickname,
            role=user.role,
            is_active=user.is_active,
            email_verified=user.email_verified,
        )

    @classmethod
    def from_models(cls, users: Iterable[UserModel]) -> List["UserRes"]:
        return [cls.from_model(u) for u in users]
