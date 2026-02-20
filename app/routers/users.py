from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.deps import get_db
from app.deps import get_current_user
from app.models import User
from app.schemas import UserOut, UserUpdate

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/me", response_model=UserOut)
def me(user: User = Depends(get_current_user)):
    return user

@router.put("/me", response_model=UserOut)
def update_me(
    data: UserUpdate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    payload = data.model_dump(exclude_unset=True)
    for k, v in payload.items():
        setattr(user, k, v)
    db.commit()
    db.refresh(user)
    return user
