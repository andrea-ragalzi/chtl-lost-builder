from typing import Optional, Dict, Any
from ..repositories.user_repo import UserRepo
from ..models.user_model import UserModel
from ..core.security import hash_password, now_utc
from ..core.utils import doc_to_model  # <-- aggiunto

ALLOWED_UPDATE_FIELDS = {
    "nickname",
    "password",
    "role",
    "is_active",
    "email_verified",
}


class UserService:
    """Application logic for User CRUD & lookup."""

    def __init__(self, repo: UserRepo):
        self.repo = repo

    # ---------- create ----------
    async def create_user(self, email: str, nickname: str, password: str) -> UserModel:
        email_norm = self._normalize_email(email)
        nickname_clean = self._clean_nickname(nickname)
        nickname_lc = nickname_clean.lower()

        if await self.repo.email_or_nickname_taken(email_norm, nickname_lc):
            raise ValueError("Email or nickname already in use")

        user = UserModel(
            email=email_norm,
            password_hash=hash_password(password),
            nickname=nickname_clean,
            created_at=now_utc(),
        )
        doc = user.model_dump(exclude_none=True)
        doc.pop("id", None)
        user.id = await self.repo.insert(doc)
        return user

    # ---------- read ----------
    async def get_by_id(self, user_id: str) -> Optional[UserModel]:
        doc = await self.repo.find_by_id(user_id)
        return doc_to_model(UserModel, doc)

    async def get_by_identifier(self, identifier: str) -> Optional[UserModel]:
        ident_norm = identifier.strip().lower()
        doc = await self.repo.find_by_email_or_nickname(ident_norm)
        return doc_to_model(UserModel, doc)

    # ---------- update ----------
    async def update_user(self, user_id: str, **fields) -> Optional[UserModel]:
        candidate: Dict[str, Any] = {
            k: v
            for k, v in fields.items()
            if k in ALLOWED_UPDATE_FIELDS and v is not None
        }

        if not candidate:
            return await self.get_by_id(user_id)

        if "nickname" in candidate:
            nickname_clean = self._clean_nickname(candidate["nickname"])
            candidate["nickname"] = nickname_clean
            candidate["nickname_lc"] = nickname_clean.lower()

        if "password" in candidate:
            candidate["password_hash"] = hash_password(candidate.pop("password"))

        if "role" in candidate and candidate["role"] is not None:
            candidate["role"] = str(candidate["role"])

        candidate["updated_at"] = now_utc()

        await self.repo.update_by_id(user_id, candidate)
        return await self.get_by_id(user_id)

    # ---------- delete ----------
    async def delete_user(self, user_id: str) -> None:
        await self.repo.delete_by_id(user_id)

    @staticmethod
    def _normalize_email(email: str) -> str:
        return email.strip().lower()

    @staticmethod
    def _clean_nickname(nickname: str) -> str:
        return nickname.strip().lower()
