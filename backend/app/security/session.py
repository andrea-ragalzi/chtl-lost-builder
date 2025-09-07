from itsdangerous import URLSafeTimedSerializer, BadSignature, SignatureExpired
from app.core.settings import get_settings

def _ser() -> URLSafeTimedSerializer:
    s = get_settings()
    return URLSafeTimedSerializer(s.secret_key, salt="session")

def create_session_token(user_id: str) -> str:
    return _ser().dumps({"uid": user_id})

def verify_session_token(token: str | None) -> str | None:
    if not token:
        return None
    try:
        s = get_settings()
        data = _ser().loads(token, max_age=s.session_max_age_seconds)
        return data.get("uid")
    except (BadSignature, SignatureExpired):
        return None

def cookie_params():
    s = get_settings()
    return {
        "key": s.cookie_name,
        "httponly": True,
        "samesite": "lax",
        "secure": s.cookie_secure,
        "domain": s.cookie_domain,  # None in dev va bene
        "path": "/",
    }
