from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List, Optional, Union
import json

class Settings(BaseSettings):
    # runtime
    MONGO_URL: str = "mongodb://localhost:27018"
    MONGO_DB: str = "chtl"
    ENV: str = "dev"

    CORS_ORIGINS: Union[str, List[str]] = "http://localhost:5173"
    COOKIE_NAME: str = "chtl_session"
    COOKIE_SECURE: bool = False
    COOKIE_DOMAIN: str = "localhost"
    SESSION_TTL_HOURS: int = 72

    # test (facoltative)
    MONGO_TEST_URL: Optional[str] = None
    MONGO_TEST_DB: Optional[str] = None

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=False,
        extra="allow",
    )

    @property
    def cors_origins(self) -> List[str]:
        v = self.CORS_ORIGINS
        if isinstance(v, list): return v
        s = (v or "").strip()
        if not s: return []
        if s.startswith("["):
            try:
                return [str(x) for x in json.loads(s)]
            except Exception:
                pass
        return [p.strip() for p in s.split(",") if p.strip()]

settings = Settings()
