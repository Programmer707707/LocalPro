from fastapi import FastAPI
from app.routers.auth import router as auth_router

app = FastAPI(title="handyman-backend")
app.include_router(auth_router)

@app.get("/health")
def health():
    return {"ok": True}
