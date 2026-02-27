from sqladmin.authentication import AuthenticationBackend
from starlette.requests import Request

#draft version of AdminAuth
#not in use

class AdminAuth(AuthenticationBackend):
    async def login(self, request: Request) -> bool:
        form = await request.form()
        if form.get("username") == "email" and form.get("password") == "password":
            request.session.update({"token": "admin"})
            return True
        return False

    async def logout(self, request: Request) -> bool:
        request.session.clear()
        return True

    async def authenticate(self, request: Request) -> bool:
        return "token" in request.session
