from functools import lru_cache
from typing import Literal, Optional
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # --- Mongo selection via flag ---
    LOCAL_RUN: bool = True  # True=use local URI, False=use docker URI
    MONGO_URI_LOCAL: str = "mongodb://localhost:27018"
    MONGO_URI_DOCKER: str = "mongodb://mongo:27017"
    MONGO_DB: str = "chtl"

    # --- Cookie/session settings ---
    SESSION_COOKIE_NAME: str = "session_id"
    SESSION_TTL_MINUTES: int = 60 * 24 * 7  # 7 days
    COOKIE_SECURE: bool = False            # True in production (HTTPS)
    COOKIE_SAMESITE: Literal["lax", "strict", "none"] = "lax"
    COOKIE_DOMAIN: Optional[str] = None    # e.g. ".example.com"
    APP_ENV: Literal["dev", "prod"] = "dev"

    model_config = {"env_file": ".env", "extra": "ignore"}

    @property
    def resolved_mongo_uri(self) -> str:
        """Pick the Mongo URI based on LOCAL_RUN flag."""
        return self.MONGO_URI_LOCAL if self.LOCAL_RUN else self.MONGO_URI_DOCKER

@lru_cache
def get_settings() -> Settings:
    return Settings()
