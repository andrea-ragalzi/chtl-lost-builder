from typing import Literal, Union
from fastapi import APIRouter, Depends, HTTPException, Request, Response, status
from ..core.config import settings
from ..core.mongo import get_db  # must expose db in app.state.db
from ..repositories.user_repo import UserRepo
from ..repositories.session_repo import SessionRepo
from ..services.user_service import UserService
from ..services.auth_service import AuthService
from ..schemas.auth_schema import RegisterReq, LoginReq
from ..schemas.user_schema import UserRes
from ..models.user_model import UserModel
from ..core.utils import doc_to_model


router = APIRouter(prefix="/auth", tags=["auth"])


# ---------- dependencies ----------
def get_user_service(db=Depends(get_db)) -> UserService:
    return UserService(UserRepo(db))


def get_auth_service(db=Depends(get_db)) -> AuthService:
    return AuthService(UserRepo(db), SessionRepo(db))


# ---------- helpers ----------
def to_user_res(user: Union[dict, UserModel]) -> UserRes:
    if isinstance(user, UserModel):
        return UserRes.from_model(user)
    model = doc_to_model(UserModel, user)
    if not model:
        raise HTTPException(status_code=500, detail="User conversion failed")
    return UserRes.from_model(model)


def compute_samesite(request: Request) -> Literal["lax", "strict", "none"]:
    if settings.COOKIE_SECURE:
        return "none"
    origin = request.headers.get("origin")
    host_header = request.headers.get("host")
    host_origin = f"{request.url.scheme}://{host_header}" if host_header else None
    return "lax" if (not origin or origin == host_origin) else "none"


# ---------- routes ----------
@router.post("/register", response_model=UserRes, status_code=status.HTTP_201_CREATED)
async def register(
    payload: RegisterReq, user_service: UserService = Depends(get_user_service)
):
    try:
        user = await user_service.create_user(
            email=payload.email,
            nickname=payload.nickname,
            password=payload.password,
        )
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    return to_user_res(user)


@router.post("/login", response_model=UserRes)
async def login(
    payload: LoginReq,
    request: Request,
    response: Response,
    auth_service: AuthService = Depends(get_auth_service),
):
    try:
        user_doc, session_id = await auth_service.login(
            payload.identifier, payload.password, request
        )
    except ValueError as exc:
        raise HTTPException(status_code=401, detail=str(exc))

    response.set_cookie(
        key=settings.COOKIE_NAME,
        value=session_id,
        httponly=True,
        secure=settings.COOKIE_SECURE,
        samesite=compute_samesite(request),
        max_age=settings.SESSION_TTL_HOURS * 3600,
        path="/",
        domain=None,
    )
    return to_user_res(user_doc)


@router.get("/me", response_model=UserRes)
async def me(
    request: Request,
    auth_service: AuthService = Depends(get_auth_service),
):
    session_id = request.cookies.get(settings.COOKIE_NAME)
    user_doc = await auth_service.me_from_cookie(session_id)
    if not user_doc:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return to_user_res(user_doc)


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
async def logout(
    request: Request,
    response: Response,
    auth_service: AuthService = Depends(get_auth_service),
):
    session_id = request.cookies.get(settings.COOKIE_NAME)
    await auth_service.logout(session_id)
    response.delete_cookie(settings.COOKIE_NAME, domain=None, path="/")
