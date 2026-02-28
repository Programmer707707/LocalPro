from fastapi import APIRouter, Depends, HTTPException, status 
from schemas import FavoriteOut
from models import User, UserRole, Favorite
from sqlalchemy.orm import Session, joinedload
from app.deps import get_current_user, get_db

router = APIRouter("/favorites", tags=["favorites"])

@router.post("/{professional_user_id}", status_code=201)
def add_favorite():
    pass 

@router.get("", response_model=list[FavoriteOut])
def list_favorites():
    pass 

@router.delete("/{professional_user_id}", status_code=204)
def remove_favorite():
    pass 

@router.get("/{professional_user_id}/check")
def check_favorite():
    pass 