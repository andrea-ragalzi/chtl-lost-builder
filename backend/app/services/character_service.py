from typing import Optional, List, Dict, Any
from ..repositories.character_repo import CharacterRepo
from ..models.character_model import CharacterModel
from ..core.utils import doc_to_model, model_to_doc
from ..core.security import now_utc


class CharacterService:
    def __init__(self, repo: CharacterRepo):
        self.repo = repo

    async def create_character(
        self, owner_id: str, data: Dict[str, Any]
    ) -> CharacterModel:
        char = CharacterModel(owner_id=owner_id, **data)
        doc = model_to_doc(char)
        doc.pop("_id", None)
        inserted_id = await self.repo.insert(doc)
        char.id = inserted_id
        return char

    async def get_character(
        self, char_id: str, owner_id: str
    ) -> Optional[CharacterModel]:
        doc = await self.repo.find_by_id(char_id, owner_id=owner_id)
        return doc_to_model(CharacterModel, doc)

    async def get_character_admin(self, char_id: str) -> Optional[CharacterModel]:
        doc = await self.repo.find_by_id(char_id, owner_id=None)
        return doc_to_model(CharacterModel, doc)

    async def list_characters(
        self, owner_id: str, skip: int = 0, limit: int = 50
    ) -> List[CharacterModel]:
        docs = await self.repo.list_by_owner(owner_id, skip=skip, limit=limit)
        return [m for d in docs if d and (m := doc_to_model(CharacterModel, d))]

    async def list_characters_admin(
        self, skip: int = 0, limit: int = 50
    ) -> List[CharacterModel]:
        docs = await self.repo.list_all(skip=skip, limit=limit)
        return [m for d in docs if d and (m := doc_to_model(CharacterModel, d))]

    async def update_character(
        self, char_id: str, owner_id: str, fields: Dict[str, Any]
    ) -> Optional[CharacterModel]:
        update = {k: v for k, v in fields.items() if v is not None}
        if not update:
            return await self.get_character(char_id, owner_id)
        update["updated_at"] = now_utc()
        ok = await self.repo.update_by_id(char_id, owner_id, update)
        if not ok:
            return None
        return await self.get_character(char_id, owner_id)

    async def update_character_admin(
        self, char_id: str, fields: Dict[str, Any]
    ) -> Optional[CharacterModel]:
        update = {k: v for k, v in fields.items() if v is not None}
        if not update:
            return await self.get_character_admin(char_id)
        update["updated_at"] = now_utc()
        ok = await self.repo.update_by_id(char_id, None, update)
        if not ok:
            return None
        return await self.get_character_admin(char_id)

    async def delete_character(self, char_id: str, owner_id: str) -> bool:
        return await self.repo.delete_by_id(char_id, owner_id)

    async def delete_character_admin(self, char_id: str) -> bool:
        return await self.repo.delete_by_id(char_id, None)
