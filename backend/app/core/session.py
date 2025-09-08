import secrets
from fastapi import Request, Response
from .config import get_settings


def new_session_id() -> str:
    """Generate a cryptographically secure session id."""
    return secrets.token_urlsafe(32)


def set_session_cookie(response: Response, session_id: str) -> None:
    """Attach an HttpOnly cookie with the session id."""
    s = get_settings()
    response.set_cookie(
        key=s.SESSION_COOKIE_NAME,
        value=session_id,
        httponly=True,
        secure=s.COOKIE_SECURE,
        samesite=s.COOKIE_SAMESITE,
        domain=s.COOKIE_DOMAIN,
    )


def clear_session_cookie(response: Response) -> None:
    """Delete the session cookie."""
    s = get_settings()
    response.delete_cookie(key=s.SESSION_COOKIE_NAME, domain=s.COOKIE_DOMAIN)


def get_session_id_from_request(request: Request) -> str | None:
    """Read the session id from the incoming request cookies."""
    s = get_settings()
    return request.cookies.get(s.SESSION_COOKIE_NAME)
