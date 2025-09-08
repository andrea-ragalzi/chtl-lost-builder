# app/routers/user_router.py
from fastapi import APIRouter, Depends, Request, Response, Query, status
from motor.motor_asyncio import AsyncIOMotorDatabase
from ..core.mongo import get_db
from ..services.auth_service import AuthService
from ..repositories.user_repo import UserRepository
from ..repositories.session_repo import SessionRepository
from ..services.user_service import UserService
from ..schemas.user_schema import (
    UserUpdateMe,
    UserPublic,
    UserChangeEmail,
    UserChangePassword,
    AvailabilityResponse,
)

router = APIRouter(prefix="/users", tags=["users"])


def get_auth(db: AsyncIOMotorDatabase = Depends(get_db)) -> AuthService:
    return AuthService(db)


def get_user_service(db: AsyncIOMotorDatabase = Depends(get_db)) -> UserService:
    return UserService(users=UserRepository(db), sessions=SessionRepository(db))


@router.get("/me", response_model=UserPublic)
async def get_me(request: Request, auth: AuthService = Depends(get_auth)):
    user = await auth.get_current_user(request)
    return auth._public_user(user)


@router.patch("/me", response_model=UserPublic)
async def update_me(
    payload: UserUpdateMe,
    request: Request,
    auth: AuthService = Depends(get_auth),
    usersvc: UserService = Depends(get_user_service),
):
    user = await auth.get_current_user(request)
    if payload.nickname is not None:
        await usersvc.update_nickname(str(user["_id"]), payload.nickname)
    refreshed = await auth.users.get_by_id(str(user["_id"]))
    if refreshed is None:
        # You can customize the exception or response as needed
        from fastapi import HTTPException

        raise HTTPException(status_code=404, detail="User not found")
    return auth._public_user(refreshed)


@router.put("/me/email", status_code=status.HTTP_204_NO_CONTENT)
async def change_email(
    payload: UserChangeEmail,
    request: Request,
    auth: AuthService = Depends(get_auth),
    usersvc: UserService = Depends(get_user_service),
):
    user = await auth.get_current_user(request)
    await usersvc.change_email(
        str(user["_id"]), payload.new_email, payload.current_password
    )
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.put("/me/password", status_code=status.HTTP_204_NO_CONTENT)
async def change_password(
    payload: UserChangePassword,
    request: Request,
    response: Response,
    auth: AuthService = Depends(get_auth),
    usersvc: UserService = Depends(get_user_service),
):
    user = await auth.get_current_user(request)
    await usersvc.change_password(
        str(user["_id"]), payload.current_password, payload.new_password
    )
    await auth.logout(request, response)  # force re-login
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.get("/availability", response_model=AvailabilityResponse)
async def check_availability(
    request: Request,
    email: str | None = Query(default=None),
    nickname: str | None = Query(default=None),
    auth: AuthService = Depends(get_auth),
    usersvc: UserService = Depends(get_user_service),
):
    """
    Check whether an email and/or nickname are available.
    If logged in, exclude the current user from the uniqueness check.
    """
    exclude_id = None
    try:
        me = await auth.get_current_user(request)
        exclude_id = str(me["_id"])
    except Exception:
        pass

    return await usersvc.availability(
        email=email, nickname=nickname, exclude_user_id=exclude_id
    )


@router.delete("/me", status_code=status.HTTP_204_NO_CONTENT)
async def delete_me(
    request: Request,
    response: Response,
    auth: AuthService = Depends(get_auth),
    usersvc: UserService = Depends(get_user_service),
):
    user = await auth.get_current_user(request)
    await usersvc.delete_account(str(user["_id"]))
    await auth.logout(request, response)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
