from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.deps import get_db
from app.deps import get_current_user
from app.models import CustomerProfile, User, UserRole
from app.schemas import CustomerProfileOut, CustomerProfileUpdate, ProfileImageUpdate

router = APIRouter(prefix="/customers", tags=["customers"])

@router.get("/me", response_model=CustomerProfileOut)
def get_my_profile(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    
    if user.role != UserRole.customer:
        raise HTTPException(status_code=403, detail="forbidden")
    
    profile = db.query(CustomerProfile).filter(CustomerProfile.user_id == user.id).first()
    
    if not profile:
        profile = CustomerProfile(user_id=user.id)
        db.add(profile)
        db.commit()
        db.refresh(profile)
    return profile

@router.put("/me", response_model=CustomerProfileOut)
def update_my_profile(data: CustomerProfileUpdate, db: Session = Depends(get_db), user: User = Depends(get_current_user),):
    profile = db.query(CustomerProfile).filter(CustomerProfile.user_id == user.id).first()
    if not profile:
        profile = CustomerProfile(user_id=user.id)
        db.add(profile)
        db.commit()
        db.refresh(profile)
        
    for k, v in data.model_dump(exclude_unset=True).items():
        setattr(profile, k, v)
        
    db.commit()
    db.refresh(profile)
    return profile


@router.patch("/me/profile_image", response_model=CustomerProfileOut)
def update_customer_profile_image(data: ProfileImageUpdate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    if user.role != UserRole.customer:
        raise HTTPException(status_code=403, detail="forbidden")
    
    profile = db.query(CustomerProfile).filter(CustomerProfile.user_id == user.id).first()
    if not profile:
        profile = CustomerProfile(user_id = user.id)
        db.add(profile)
        db.commit()
        db.refresh(profile)
        
    profile.profile_image_url = data.profile_image_url
    db.commit()
    db.refresh(profile)
    return profile