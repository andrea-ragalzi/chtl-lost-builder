from contextlib import asynccontextmanager
from app.core.mongo import ensure_indexes
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi
from starlette.responses import RedirectResponse
from .core.config import settings
from .routers import auth_router, health_router, user_router, character_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    await ensure_indexes()
    yield


# Istanzia UNA sola app
app = FastAPI(
    title="CHTL API",
    version="0.1.0",
    servers=[{"url": "http://localhost:8000"}],
    swagger_ui_parameters={"persistAuthorization": True},
    lifespan=lifespan,
)

# CORS (gestisce anche OPTIONS)
allowed_origins = getattr(
    settings,
    "cors_origins",
    [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Redirect docs 127.0.0.1 -> localhost (per Swagger "Try it out")
@app.middleware("http")
async def redirect_docs_host(request: Request, call_next):
    if request.url.path in ("/docs", "/openapi.json") and request.headers.get(
        "host", ""
    ).startswith("127.0.0.1"):
        new = str(request.url).replace("127.0.0.1", "localhost")
        return RedirectResponse(new, status_code=307)
    return await call_next(request)


# OpenAPI con cookieAuth
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title=app.title,
        version=app.version,
        description="CHTL: The Lost Builder API",
        routes=app.routes,
    )
    openapi_schema.setdefault("components", {}).setdefault("securitySchemes", {})[
        "cookieAuth"
    ] = {
        "type": "apiKey",
        "in": "cookie",
        "name": settings.COOKIE_NAME,
    }
    # Applica cookieAuth di default (le rotte pubbliche si possono escludere con dependencies)
    for path in openapi_schema["paths"].values():
        for method in path.values():
            method.setdefault("security", [{"cookieAuth": []}])
    app.openapi_schema = openapi_schema
    return app.openapi_schema


app.openapi = custom_openapi

# Routers
app.include_router(health_router.router)
app.include_router(auth_router.router)
app.include_router(user_router.router)
app.include_router(character_router.router)
