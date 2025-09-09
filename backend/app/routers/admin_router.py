# app/routers/admin_router.py
from fastapi import APIRouter, Depends, Query, status
from motor.motor_asyncio import AsyncIOMotorDatabase

from ..core.mongo import get_db
from ..core.permissions import require_admin
from ..repositories.user_repo import UserRepo
from ..repositories.session_repo import SessionRepo
from ..services.admin_service import AdminService
from ..schemas.admin_schema import AdminUserUpdate, AdminUserCreate

router = APIRouter(prefix="/admin", tags=["admin"])


def get_admin_service(db: AsyncIOMotorDatabase = Depends(get_db)) -> AdminService:
    return AdminService(
        users=UserRepo(db),
        sessions=SessionRepo(db),
    )


@router.post("/users", status_code=status.HTTP_201_CREATED)
async def create_user_admin(
    payload: AdminUserCreate,
    _: dict = Depends(require_admin),
    svc: AdminService = Depends(get_admin_service),
):
    """Admin: create a new user with role/is_active."""
    return await svc.create_user(payload)


@router.get("/users")
async def list_users(
    _: dict = Depends(require_admin),
    q: str | None = Query(default=None),
    role: str | None = Query(default=None),
    is_active: bool | None = Query(default=None),
    limit: int = Query(50, ge=1, le=200),
    skip: int = Query(0, ge=0),
    svc: AdminService = Depends(get_admin_service),
):
    return await svc.list_users(
        q=q, role=role, is_active=is_active, limit=limit, skip=skip
    )


@router.get("/users/{user_id}")
async def get_user(
    user_id: str,
    _: dict = Depends(require_admin),
    svc: AdminService = Depends(get_admin_service),
):
    return await svc.get_user(user_id)


@router.patch("/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def patch_user(
    user_id: str,
    payload: AdminUserUpdate,
    me: dict = Depends(require_admin),
    svc: AdminService = Depends(get_admin_service),
):
    await svc.patch_user(
        target_user_id=user_id, payload=payload, actor_id=str(me["_id"])
    )
    return {"status": "ok"}


@router.delete("/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(
    user_id: str,
    me: dict = Depends(require_admin),
    svc: AdminService = Depends(get_admin_service),
):
    await svc.delete_user(target_user_id=user_id, actor_id=str(me["_id"]))
    return {"status": "ok"}
