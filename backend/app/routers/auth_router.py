from fastapi import APIRouter, Depends, HTTPException, Request, Response, status
from ..core.mongo import get_db
from ..core.config import settings
from ..repositories.user_repo import UserRepo
from ..repositories.session_repo import SessionRepo
from ..services.user_service import UserService
from ..services.auth_service import AuthService
from ..schemas.auth_schema import RegisterIn, LoginIn
from ..schemas.user_schema import UserOut

router = APIRouter(prefix="/auth", tags=["auth"])

def serialize_user(u: dict) -> UserOut:
    return UserOut(
        id=str(u["_id"]) if "_id" in u else u["id"],
        email=u.get("email"),
        nickname=u["nickname"],
        role=u.get("role","user"),
        is_active=u.get("is_active", True),
        email_verified=u.get("email_verified", False),
    )

@router.post("/register", response_model=UserOut, status_code=201)
async def register(body: RegisterIn, db=Depends(get_db)):
    user_service = UserService(UserRepo(db))
    try:
        created = await user_service.create_user(body.email, body.nickname, body.password)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    return serialize_user(created)

@router.post("/login", response_model=UserOut)
async def login(body: LoginIn, request: Request, response: Response, db=Depends(get_db)):
    auth = AuthService(UserRepo(db), SessionRepo(db))
    try:
        user, sid = await auth.login(body.identifier, body.password, request)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    response.set_cookie(
        key=settings.COOKIE_NAME,
        value=sid,
        httponly=True,
        secure=settings.COOKIE_SECURE,
        samesite="none" if settings.COOKIE_SECURE else "lax",
        domain=settings.COOKIE_DOMAIN,
        max_age=settings.SESSION_TTL_HOURS * 3600,
        path="/",
    )
    return serialize_user(user)

@router.get("/me", response_model=UserOut)
async def me(request: Request, db=Depends(get_db)):
    sid = request.cookies.get(settings.COOKIE_NAME)
    auth = AuthService(UserRepo(db), SessionRepo(db))
    user = await auth.me_from_cookie(sid)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return serialize_user(user)

@router.post("/logout", status_code=204)
async def logout(request: Request, response: Response, db=Depends(get_db)):
    sid = request.cookies.get(settings.COOKIE_NAME)
    await AuthService(UserRepo(db), SessionRepo(db)).logout(sid)
    response.delete_cookie(settings.COOKIE_NAME, domain=settings.COOKIE_DOMAIN, path="/")
    return Response(status_code=status.HTTP_204_NO_CONTENT)
