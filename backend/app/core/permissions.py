"""
Guard minimale per ambienti di sviluppo/test.
In produzione sostituire con un controllo reale dell'utente corrente.
"""

from typing import Dict

async def require_admin() -> Dict:
    """
    Finge un utente admin attivo. Usato per far funzionare /admin/* in dev/test
    quando non è disponibile un sistema auth completo.
    """
    return {"_id": "000000000000000000000000", "role": "admin", "is_active": True}