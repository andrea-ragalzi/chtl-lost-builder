from fastapi import APIRouter, Depends, Request, Response
from motor.motor_asyncio import AsyncIOMotorDatabase
from ..core.mongo import get_db
from ..services.auth_service import AuthService
from ..schemas.user_schema import UserCreate, UserPublic
from ..schemas.auth_schema import LoginRequest, LoginResponse

router = APIRouter(prefix="/auth", tags=["auth"])


def get_auth_service(db: AsyncIOMotorDatabase = Depends(get_db)) -> AuthService:
    return AuthService(db)


@router.post("/register", response_model=UserPublic)
async def register(payload: UserCreate, svc: AuthService = Depends(get_auth_service)):
    """Register a new user; returns public profile."""
    return await svc.register(payload.email, payload.password, payload.nickname)


@router.post("/login", response_model=LoginResponse)
async def login(
    payload: LoginRequest,
    request: Request,
    response: Response,
    svc: AuthService = Depends(get_auth_service),
):
    """Login with email/password; sets HttpOnly cookie."""
    user = await svc.login(request, response, payload.email, payload.password)
    return {"user": user}


@router.get("/me", response_model=UserPublic)
async def me(request: Request, svc: AuthService = Depends(get_auth_service)):
    """Return current user's public info from session cookie."""
    user = await svc.get_current_user(request)
    return svc._public_user(user)


@router.post("/logout", status_code=204)
async def logout(
    request: Request, response: Response, svc: AuthService = Depends(get_auth_service)
):
    """Revoke the active session and clear the cookie."""
    await svc.logout(request, response)
    return Response(status_code=204)
