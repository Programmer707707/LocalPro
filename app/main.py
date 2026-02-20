from fastapi import FastAPI
from app.routers.auth import router as auth_router
from app.routers.users import router as users_router
from app.routers.categories import router as categories_router
from app.routers.customer_profile import router as customer_profile_router
from app.routers.professional_profile import router as professional_profile_router

app = FastAPI(title="handyman-backend")
app.include_router(auth_router)
app.include_router(users_router)
app.include_router(categories_router)
app.include_router(customer_profile_router)
app.include_router(professional_profile_router)

@app.get("/health")
def health():
    return {"ok": True}
