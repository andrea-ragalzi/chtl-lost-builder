# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi
from .core.config import settings
from .core.mongo import ensure_indexes
from .routers import auth_router, health_router  # + eventuali altri
from starlette.responses import RedirectResponse


app = FastAPI(
    title="CHTL API",
    version="0.1.0",
    servers=[{"url": "http://localhost:8000"}],  # Swagger Try it out usa questo host
    swagger_ui_parameters={"persistAuthorization": True},
)


@app.middleware("http")
async def redirect_docs_host(request, call_next):
    if request.url.path in ("/docs", "/openapi.json") and request.headers.get(
        "host", ""
    ).startswith("127.0.0.1"):
        new = str(request.url).replace("127.0.0.1", "localhost")
        return RedirectResponse(new, status_code=307)
    return await call_next(request)


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
    # Opzionale: applica cookieAuth a tutte le path (puoi toglierlo per rotte pubbliche)
    for path in openapi_schema["paths"].values():
        for method in path.values():
            method.setdefault("security", [{"cookieAuth": []}])
    app.openapi_schema = openapi_schema
    return app.openapi_schema


app.openapi = custom_openapi

app.add_middleware(
    CORSMiddleware,
    allow_origins=getattr(settings, "cors_origins", []),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    await ensure_indexes()


app.include_router(health_router.router)
app.include_router(auth_router.router)
