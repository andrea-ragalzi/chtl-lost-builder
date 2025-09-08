# app/enums/roles.py
from typing import Final

ROLES: Final[tuple[str, ...]] = ("user", "admin")
DEFAULT_ROLE: Final[str] = "user"
ADMIN_ROLE: Final[str] = "admin"
