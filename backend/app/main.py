from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from .core.settings import get_settings
from .core.mongo import create_motor_client
from .routers.auth_router import router as auth_router
from .routers.user_route import router as user_router

app = FastAPI(title="CHTL: The Lost Builder - API")

settings = get_settings()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # vite dev
        "http://localhost:3000",
    ],
    allow_credentials=True,  # needed for cookies
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_db():
    # Create and share Motor client/db
    client: AsyncIOMotorClient = create_motor_client()
    app.state.client = client
    app.state.db = client[settings.MONGO_DB]
    db = app.state.db

    # Ensure basic indexes
    await db["users"].create_index("email", unique=True)
    # TTL index: Mongo will delete docs when expires_at < now (eventually)
    await db["sessions"].create_index("expires_at", expireAfterSeconds=0)
    await db["sessions"].create_index("revoked")

@app.on_event("shutdown")
async def shutdown_db():
    client: AsyncIOMotorClient = app.state.client
    client.close()

# Routers
app.include_router(auth_router, prefix="/api")
app.include_router(user_router, prefix="/api")
