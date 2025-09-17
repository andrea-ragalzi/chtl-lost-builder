from typing import Optional, TypeVar, Dict, Any
from bson import ObjectId
from pydantic import BaseModel

ModelType = TypeVar("ModelType", bound=BaseModel)


def oid_or_none(id_str: str | None) -> Optional[ObjectId]:
    if not id_str:
        return None
    return ObjectId(id_str) if ObjectId.is_valid(id_str) else None


def doc_to_model(
    model_class: type[ModelType], document: Optional[dict]
) -> Optional[ModelType]:
    if not document:
        return None
    data = document.copy()
    raw_id = data.pop("_id", None)
    if raw_id is not None:
        data["id"] = str(raw_id)
    return model_class(**data)


def model_to_doc(model_instance: BaseModel) -> Dict[str, Any]:
    data = model_instance.model_dump(exclude_none=True)
    str_id = data.pop("id", None)
    if str_id and ObjectId.is_valid(str_id):
        data["_id"] = ObjectId(str_id)
    return data
