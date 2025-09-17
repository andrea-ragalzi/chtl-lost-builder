from __future__ import annotations
from typing import Optional, Dict, List
from datetime import datetime, timezone
from pydantic import BaseModel, Field


class CharacterModel(BaseModel):
    id: Optional[str] = None
    owner_id: str  # user id (stringified ObjectId)
    name: str
    concept: Optional[str] = None
    seeming: Optional[str] = None
    kith: Optional[str] = None
    court: Optional[str] = None
    clarity: int = 7
    wyrd: int = 1
    glamour_current: int = 0
    glamour_max: int = 10
    willpower_current: int = 5
    willpower_max: int = 5
    attributes: Dict[str, int] = Field(default_factory=dict)  # es: {"strength":2,...}
    skills: Dict[str, int] = Field(default_factory=dict)  # es: {"athletics":2,...}
    specialties: List[str] = Field(default_factory=list)
    merits: List[Dict[str, int]] = Field(
        default_factory=list
    )  # [{"name":"Resources","dots":2}]
    contracts: List[Dict[str, int]] = Field(
        default_factory=list
    )  # [{"name":"Smoke", "rating":1}]
    notes: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: Optional[datetime] = None
