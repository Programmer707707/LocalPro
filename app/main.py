from fastapi import FastAPI
from app.routers import reviews
from app.routers.uploads import router as uploads
from app.routers.auth import router as auth_router
from app.routers.users import router as users_router
from app.routers.categories import router as categories_router
from app.routers.customer_profile import router as customer_profile_router
from app.routers.professional_profile import router as professional_profile_router
from starlette.middleware.sessions import SessionMiddleware
from app.admin import setup_admin
from app.config import settings

app = FastAPI(title="handyman-backend")

app.add_middleware(
    SessionMiddleware,
    secret_key=settings.secret_key,
)


setup_admin(app)

app.include_router(auth_router)
app.include_router(users_router)
app.include_router(reviews.router)
app.include_router(categories_router)
app.include_router(customer_profile_router)
app.include_router(professional_profile_router)
app.include_router(uploads)

@app.get("/health")
def health():
    return {"ok": True}
