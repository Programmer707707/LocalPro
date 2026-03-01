from fastapi import APIRouter, Depends, HTTPException, status
from schemas import FavoriteOut
from models import User, UserRole, Favorite
from sqlalchemy.orm import Session, joinedload
from app.deps import get_current_user, get_db

router = APIRouter("/favorites", tags=["favorites"])

@router.post("/{professional_user_id}", status_code=201)
def add_favorite(professional_user_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):

    if user.id == professional_user_id:
        raise HTTPException(status_code=400, detail="cannot favorite yourself")
    
    professional = db.query(User).filter(User.id == professional_user_id, User.role == UserRole.professional, User.is_active == True).first()
    if not professional:
        raise HTTPException(status_code=404, detail="professional_not_found")
    
    existing = db.query(Favorite).filter(
        Favorite.customer_user_id == user.id,
        Favorite.professional_user_id == professional_user_id
    ).first()
    
    if existing:
        raise HTTPException(status_code=400, detail="already_in_favorites")
    
    fav = Favorite(customer_user_id = user.id, professional_user_id = professional_user_id)
    db.add(fav)
    db.commit()
    return {"status": "ok"}


@router.get("", response_model=list[FavoriteOut])
def list_favorites(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    favorites = db.query(Favorite).options(joinedload(Favorite.professional)).join(
        User, User.id == Favorite.professional_user_id).filter(
            Favorite.customer_user_id == user.id,
            User.is_active == True,
            User.role == UserRole.professional
        ).order_by(Favorite.id.asc()).all()
        
    return favorites


@router.delete("/{professional_user_id}", status_code=204)
def remove_favorite(
    professional_user_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    if user.role != UserRole.customer:
        raise HTTPException(status_code=403, detail="forbidden")

    fav = db.query(Favorite).filter(
        Favorite.customer_user_id == user.id,
        Favorite.professional_user_id == professional_user_id,
    ).first()
    if not fav:
        raise HTTPException(status_code=404, detail="not_in_favorites")

    db.delete(fav)
    db.commit()


@router.get("/{professional_user_id}/check")
def check_favorite(
    professional_user_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    if user.role != UserRole.customer:
        raise HTTPException(status_code=403, detail="forbidden")

    exists = db.query(Favorite).filter(
        Favorite.customer_user_id == user.id,
        Favorite.professional_user_id == professional_user_id,
    ).first()

    return {"is_favorited": bool(exists)}