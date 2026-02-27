import time 
import hmac
import uuid 
import hashlib
from fastapi import APIRouter, Depends
from app.deps import get_current_user
from app.config import settings
from app.models import User

router = APIRouter(prefix="/uploads", tags=["uploads"])

@router.get("/imagekit-auth")
def get_imagekit_auth(user: User = Depends(get_current_user)):
    token = str(uuid.uuid4())
    expire = int(time.time()) + 60*30
    signature = hmac.new(
        settings.imagekit_private_key.encode(),
        msg=f"{token}{expire}".encode(),
        digestmod=hashlib.sha1
    ).hexdigest()
    
    return {
        "token": token,
        "expire": expire,
        "signature": signature,
        "publicKey": settings.imagekit_public_key,
        "urlEndpoint": settings.imagekit_url_endpoint,
    }