# app/main.py
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import OperationFailure
from typing import Any

from .core.settings import get_settings
from .core.mongo import create_motor_client
from .routers.auth_router import router as auth_router
from .routers.user_router import router as user_router

settings = get_settings()


async def _ensure_index(
    col,
    *,
    name: str,
    keys: list[tuple[str, int]],
    unique: bool = False,
    partial: dict[str, Any] | None = None
) -> None:
    """
    Ensure an index with a given spec:
    - If an index with the same name exists but options differ (keys/unique/partial), drop and recreate it.
    - Otherwise create it if missing.
    """
    info = await col.index_information()
    spec = info.get(name)
    desired_key = keys  # e.g. [("email", 1)]
    desired_unique = bool(unique)
    desired_partial = partial or None

    def _same(a: Any, b: Any) -> bool:
        return a == b

    if spec:
        same_keys = _same(spec.get("key"), desired_key)
        same_unique = _same(bool(spec.get("unique", False)), desired_unique)
        same_partial = _same(spec.get("partialFilterExpression"), desired_partial)
        if same_keys and same_unique and same_partial:
            # Index already matches desired spec -> nothing to do
            return
        try:
            await col.drop_index(name)
        except OperationFailure:
            # Best-effort: if drop fails, we try to continue (it will fail on create_index anyway)
            pass

    kwargs: dict[str, Any] = {"name": name}
    if unique:
        kwargs["unique"] = True
    if partial is not None:
        kwargs["partialFilterExpression"] = partial
    await col.create_index(keys, **kwargs)


async def _ensure_indexes(db):
    """Create/align all required indexes in an idempotent way."""
    # Sessions (TTL + revoked flag)
    await db["sessions"].create_index("expires_at", expireAfterSeconds=0)
    await db["sessions"].create_index("revoked")

    # Users: enforce UNIQUE email and UNIQUE nickname_lc
    # Since your DB is empty, we can use strict unique indexes (no partial).
    await _ensure_index(
        db["users"], name="uniq_email", keys=[("email", 1)], unique=True
    )
    await _ensure_index(
        db["users"], name="uniq_nickname_lc", keys=[("nickname_lc", 1)], unique=True
    )


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Create Mongo client, ensure indexes, close on shutdown."""
    client: AsyncIOMotorClient = create_motor_client()
    app.state.client = client
    app.state.db = client[settings.MONGO_DB]

    await _ensure_indexes(app.state.db)

    try:
        yield
    finally:
        client.close()


app = FastAPI(title="CHTL: The Lost Builder - API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
    ],
    allow_credentials=True,  # cookie-based auth
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api")
app.include_router(user_router, prefix="/api")
