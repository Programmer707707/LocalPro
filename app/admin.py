from sqladmin import Admin, ModelView
from sqladmin.authentication import AuthenticationBackend
from starlette.requests import Request

from app.db import engine, SessionLocal
from app.models import User, UserRole, Category, Review
from app.security import verify_password
from app.config import settings

from app.models import (User, UserRole)
from app.views import (
    UserAdmin, CategoryAdmin, ReviewAdmin,
    CustomerProfileAdmin, ProfessionalProfileAdmin, PortfolioImageAdmin
)

#source for adminauth: https://aminalaee.github.io/sqladmin/authentication/
class AdminAuth(AuthenticationBackend):
    async def login(self, request: Request) -> bool:
        form = await request.form()
        email = (form.get("username") or "").strip()
        password = form.get("password") or ""

        db = SessionLocal()
        try:
            user = (
                db.query(User)
                .filter(
                    User.email == email,
                    User.is_active == True,
                    User.role == UserRole.admin,
                )
                .first()
            )
            if not user:
                return False

            if not verify_password(password, user.password_hash):
                return False

        finally:
            db.close()

        request.session.update({"admin_email": email})
        return True

    async def logout(self, request: Request) -> bool:
        request.session.clear()
        return True

    async def authenticate(self, request: Request) -> bool:
        return bool(request.session.get("admin_email"))


def setup_admin(app):
    authentication_backend = AdminAuth(secret_key=settings.secret_key)
    admin = Admin(app, engine, authentication_backend=authentication_backend)

    admin.add_view(UserAdmin)
    admin.add_view(CategoryAdmin)
    admin.add_view(ReviewAdmin)
    admin.add_view(CustomerProfileAdmin)       
    admin.add_view(ProfessionalProfileAdmin)   
    admin.add_view(PortfolioImageAdmin)        