# app/core/config.py
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List, Union
import json

class Settings(BaseSettings):
    MONGO_URL: str = "mongodb://localhost:27017"
    MONGO_DB: str = "chtl"
    ENV: str = "dev"

    # accetta sia stringa che lista
    CORS_ORIGINS: Union[str, List[str]] = "http://localhost:5173"

    COOKIE_NAME: str = "chtl_session"
    COOKIE_DOMAIN: str | None = None
    COOKIE_SECURE: bool = False
    SESSION_TTL_HOURS: int = 72

    model_config = SettingsConfigDict(env_file=".env", case_sensitive=False)

    @property
    def cors_origins(self) -> List[str]:
        v = self.CORS_ORIGINS
        if isinstance(v, list):
            return v
        s = (v or "").strip()
        if not s:
            return []
        # JSON array?
        if s.startswith("["):
            try:
                arr = json.loads(s)
                return [str(x) for x in arr]
            except json.JSONDecodeError:
                pass
        # CSV
        return [p.strip() for p in s.split(",") if p.strip()]

settings = Settings()
