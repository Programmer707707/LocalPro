from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.deps import get_db
from app.models import Category, User
from app.schemas import CategoryOut, CategoryCreate
from app.deps import get_current_user

from scripts.seed_categories import slugify

router = APIRouter(prefix="/categories", tags=["categories"])

@router.get("/", response_model=list[CategoryOut])
def list_categories(db: Session = Depends(get_db)):
    categories = db.query(Category).order_by(Category.name.asc()).all()
    return categories

@router.post("/", response_model=CategoryOut, status_code=201)
def create_category(
    data: CategoryCreate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    if user.role.value != "admin":
        raise HTTPException(status_code=403, detail="forbidden")

    slug = slugify(data.name)

    exists = db.query(Category).filter((Category.name == data.name) | (Category.slug == slug)).first()
    if exists:
        raise HTTPException(status_code=409, detail="category_already_exists")

    category = Category(name=data.name, slug=slug)
    db.add(category)
    db.commit()
    db.refresh(category)
    return category