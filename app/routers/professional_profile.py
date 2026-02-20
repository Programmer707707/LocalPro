from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from typing import List, Annotated
from app.deps import get_db
from app.deps import get_current_user
from app.models import ProfessionalProfile, Category, User, UserRole
from app.schemas import ProfessionalProfileOut, ProfessionalProfileUpdate, ProfessionalPublicOut

router = APIRouter(prefix="/professionals", tags=["professionals"])

@router.get("/", response_model=List[ProfessionalPublicOut])
def get_all_professionals(db: Annotated[Session, Depends(get_db)]):
    professionals = db.query(ProfessionalProfile).options(joinedload(ProfessionalProfile.user), joinedload(ProfessionalProfile.categories)).order_by(ProfessionalProfile.id.asc()).all()
    return professionals

@router.get("/me", response_model=ProfessionalProfileOut)
def get_my_profile(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    if user.role.value != "professional":
        raise HTTPException(status_code=403, detail="forbidden")

    profile = db.query(ProfessionalProfile).filter(ProfessionalProfile.user_id == user.id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="professional_profile_not_found")
    return profile

@router.put("/me", response_model=ProfessionalProfileOut)
def upsert_my_profile(
    data: ProfessionalProfileUpdate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    if user.role.value != "professional":
        raise HTTPException(status_code=403, detail="forbidden")

    profile = db.query(ProfessionalProfile).filter(ProfessionalProfile.user_id == user.id).first()

    if not profile:
        if not data.city:
            raise HTTPException(status_code=400, detail="city_required_to_create_profile")
        profile = ProfessionalProfile(
            user_id=user.id,
            city=data.city,
            service_areas=data.service_areas or "",
            years_experience=data.years_experience or 0,
            bio=data.bio,
            starting_price=data.starting_price,
            phone=data.phone,
            profile_image_url=data.profile_image_url,
        )
        db.add(profile)
        db.commit()
        db.refresh(profile)

    payload = data.model_dump(exclude_unset=True)

    category_ids = payload.pop("category_ids", None)
    for k, v in payload.items():
        setattr(profile, k, v)

    if category_ids is not None:
        categories = db.query(Category).filter(Category.id.in_(category_ids)).all()
        profile.categories = categories

    db.commit()
    db.refresh(profile)
    return profile


@router.get("/{professional_user_id}", response_model=ProfessionalPublicOut)
def get_public_professional_profile(professional_user_id: int, db: Session = Depends(get_db)):
    profile = (
        db.query(ProfessionalProfile)
        .join(User, User.id == ProfessionalProfile.user_id)
        .options(joinedload(ProfessionalProfile.user), joinedload(ProfessionalProfile.categories))
        .filter(
            ProfessionalProfile.user_id == professional_user_id,
            User.is_active == True,
            User.role == UserRole.professional
        ).first()
    )
    
    if not profile:
        raise HTTPException(status_code=404, detail="Professional not found")
    
    return profile