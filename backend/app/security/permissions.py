from fastapi import Depends, HTTPException, Request, status
from motor.motor_asyncio import AsyncIOMotorDatabase
from ..core.mongo import get_db
from ..services.auth_service import AuthService
from ..enums.user_role_enum import ADMIN_ROLE

def get_auth(db: AsyncIOMotorDatabase = Depends(get_db)) -> AuthService:
    return AuthService(db)

async def require_user(request: Request, auth: AuthService = Depends(get_auth)) -> dict:
    user = await auth.get_current_user(request)
    return user

async def require_admin(request: Request, auth: AuthService = Depends(get_auth)) -> dict:
    user = await auth.get_current_user(request)
    if user.get("role") != ADMIN_ROLE:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin required")
    return user
