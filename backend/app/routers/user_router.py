from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)
from ..core.mongo import get_db
from ..schemas.user_schema import UserUpdateReq, UserRes
from ..services.user_service import UserService
from ..repositories.user_repo import UserRepo

router = APIRouter(prefix="/users", tags=["users"])


def get_user_service(db=Depends(get_db)) -> UserService:
    return UserService(UserRepo(db))


@router.get("/{user_id}", response_model=UserRes)
async def get_user(
    user_id: str,
    service: UserService = Depends(get_user_service),
) -> UserRes:
    user = await service.get_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Not found")
    return UserRes.from_model(user)


@router.patch("/{user_id}", response_model=UserRes)
async def update_user(
    user_id: str,
    payload: UserUpdateReq,
    service: UserService = Depends(get_user_service),
) -> UserRes:
    data = payload.model_dump(exclude_unset=True)
    if not data:
        raise HTTPException(status_code=400, detail="No fields to update")
    user = await service.update_user(user_id, **data)
    if not user:
        raise HTTPException(status_code=404, detail="Not found")
    return UserRes.from_model(user)


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(
    user_id: str,
    service: UserService = Depends(get_user_service),
):
    await service.delete_user(user_id)
