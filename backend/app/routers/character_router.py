from app.repositories.session_repo import SessionRepo
from app.repositories.user_repo import UserRepo
from fastapi import APIRouter, Depends, HTTPException, Query, Request, status
from typing import List
from ..core.config import settings
from ..core.mongo import get_db
from ..repositories.character_repo import CharacterRepo
from ..services.auth_service import AuthService
from ..services.character_service import CharacterService
from ..schemas.character_schema import (
    CharacterCreateReq,
    CharacterUpdateReq,
    CharacterRes,
)
from ..enums.user_role_enum import UserRole  # ensure enum available

router = APIRouter(prefix="/characters", tags=["characters"])


def get_auth_service(db=Depends(get_db)) -> AuthService:
    return AuthService(UserRepo(db), SessionRepo(db))


def get_character_service(db=Depends(get_db)) -> CharacterService:
    return CharacterService(CharacterRepo(db))


async def get_auth_user(
    request: Request,
    auth_service: AuthService = Depends(get_auth_service),
):
    session_id = request.cookies.get(settings.COOKIE_NAME)
    user_doc = await auth_service.me_from_cookie(session_id)
    if not user_doc:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return user_doc


def is_admin(user_doc) -> bool:
    role_val = user_doc.get("role")
    # Stored as string; accept enum value or string
    if isinstance(role_val, UserRole):
        return role_val == UserRole.ADMIN
    return str(role_val).upper() == "ADMIN"


@router.post("", response_model=CharacterRes, status_code=status.HTTP_201_CREATED)
async def create_character(
    payload: CharacterCreateReq,
    user=Depends(get_auth_user),
    service: CharacterService = Depends(get_character_service),
):
    char = await service.create_character(
        owner_id=str(user["_id"]),
        data=payload.model_dump(exclude_unset=True),
    )
    return CharacterRes.from_model(char)


@router.get("", response_model=List[CharacterRes])
async def list_characters(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    user=Depends(get_auth_user),
    service: CharacterService = Depends(get_character_service),
):
    if is_admin(user):
        chars = await service.list_characters_admin(skip=skip, limit=limit)
    else:
        chars = await service.list_characters(
            owner_id=str(user["_id"]), skip=skip, limit=limit
        )
    return CharacterRes.from_models(chars)


@router.get("/{character_id}", response_model=CharacterRes)
async def get_character(
    character_id: str,
    user=Depends(get_auth_user),
    service: CharacterService = Depends(get_character_service),
):
    if is_admin(user):
        char = await service.get_character_admin(character_id)
    else:
        char = await service.get_character(character_id, owner_id=str(user["_id"]))
    if not char:
        raise HTTPException(status_code=404, detail="Not found")
    return CharacterRes.from_model(char)


@router.patch("/{character_id}", response_model=CharacterRes)
async def update_character(
    character_id: str,
    payload: CharacterUpdateReq,
    user=Depends(get_auth_user),
    service: CharacterService = Depends(get_character_service),
):
    data = payload.model_dump(exclude_unset=True)
    if not data:
        raise HTTPException(status_code=400, detail="No fields to update")
    if is_admin(user):
        char = await service.update_character_admin(character_id, data)
    else:
        char = await service.update_character(
            character_id, owner_id=str(user["_id"]), fields=data
        )
    if not char:
        raise HTTPException(status_code=404, detail="Not found")
    return CharacterRes.from_model(char)


@router.delete("/{character_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_character(
    character_id: str,
    user=Depends(get_auth_user),
    service: CharacterService = Depends(get_character_service),
):
    if is_admin(user):
        ok = await service.delete_character_admin(character_id)
    else:
        ok = await service.delete_character(character_id, owner_id=str(user["_id"]))
    if not ok:
        raise HTTPException(status_code=404, detail="Not found")
