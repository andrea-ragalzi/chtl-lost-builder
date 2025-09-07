from fastapi import APIRouter, Depends, Request
from motor.motor_asyncio import AsyncIOMotorDatabase
from ..core.mongo import get_db
from ..services.auth_service import AuthService
from ..services.user_service import UserService
from ..repositories.user_repo import UserRepository
from ..schemas.user_schema import UserUpdateMe, UserPublic

router = APIRouter(prefix="/users", tags=["users"])


def get_auth(db: AsyncIOMotorDatabase = Depends(get_db)) -> AuthService:
    return AuthService(db)


def get_user_service(db: AsyncIOMotorDatabase = Depends(get_db)) -> UserService:
    return UserService(UserRepository(db))


@router.patch("/me", response_model=UserPublic)
async def update_me(
    payload: UserUpdateMe,
    request: Request,
    auth: AuthService = Depends(get_auth),
    usersvc: UserService = Depends(get_user_service),
):
    """Update current user's profile (nickname only in MVP)."""
    user = await auth.get_current_user(request)
    if payload.nickname is not None:
        await usersvc.update_nickname(str(user["_id"]), payload.nickname)
    refreshed = await auth.users.get_by_id(str(user["_id"]))
    if refreshed is None:
        # You can raise an HTTPException or handle it as needed
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="User not found")
    return auth._public_user(refreshed)
