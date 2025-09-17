from __future__ import annotations
from typing import Optional, Dict, List, Iterable
from pydantic import BaseModel, Field
from ..models.character_model import CharacterModel


class CharacterCreateReq(BaseModel):
    name: str = Field(min_length=2, max_length=60)
    concept: Optional[str] = None
    seeming: Optional[str] = None
    kith: Optional[str] = None
    court: Optional[str] = None
    clarity: Optional[int] = Field(default=7, ge=1, le=10)
    wyrd: Optional[int] = Field(default=1, ge=1, le=10)
    glamour_current: Optional[int] = Field(default=0, ge=0)
    glamour_max: Optional[int] = Field(default=10, ge=1)
    willpower_current: Optional[int] = Field(default=5, ge=0)
    willpower_max: Optional[int] = Field(default=5, ge=1)
    attributes: Dict[str, int] = Field(default_factory=dict)
    skills: Dict[str, int] = Field(default_factory=dict)
    specialties: List[str] = Field(default_factory=list)
    merits: List[Dict[str, int]] = Field(default_factory=list)
    contracts: List[Dict[str, int]] = Field(default_factory=list)
    notes: Optional[str] = None


class CharacterUpdateReq(BaseModel):
    name: Optional[str] = Field(None, min_length=2, max_length=60)
    concept: Optional[str] = None
    seeming: Optional[str] = None
    kith: Optional[str] = None
    court: Optional[str] = None
    clarity: Optional[int] = Field(None, ge=1, le=10)
    wyrd: Optional[int] = Field(None, ge=1, le=10)
    glamour_current: Optional[int] = Field(None, ge=0)
    glamour_max: Optional[int] = Field(None, ge=1)
    willpower_current: Optional[int] = Field(None, ge=0)
    willpower_max: Optional[int] = Field(None, ge=1)
    attributes: Optional[Dict[str, int]] = None
    skills: Optional[Dict[str, int]] = None
    specialties: Optional[List[str]] = None
    merits: Optional[List[Dict[str, int]]] = None
    contracts: Optional[List[Dict[str, int]]] = None
    notes: Optional[str] = None


class CharacterRes(BaseModel):
    id: str
    owner_id: str
    name: str
    concept: Optional[str]
    seeming: Optional[str]
    kith: Optional[str]
    court: Optional[str]
    clarity: int
    wyrd: int
    glamour_current: int
    glamour_max: int
    willpower_current: int
    willpower_max: int
    attributes: Dict[str, int]
    skills: Dict[str, int]
    specialties: List[str]
    merits: List[Dict[str, int]]
    contracts: List[Dict[str, int]]
    notes: Optional[str]

    @classmethod
    def from_model(cls, m: CharacterModel) -> "CharacterRes":
        return cls(**m.model_dump())

    @classmethod
    def from_models(cls, items: Iterable[CharacterModel]) -> list["CharacterRes"]:
        return [cls.from_model(i) for i in items]
