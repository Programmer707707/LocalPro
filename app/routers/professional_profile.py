from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import func, desc, asc
from sqlalchemy.orm import Session, joinedload
from typing import List, Annotated, Literal
from app.deps import get_db
from app.deps import get_current_user
from app.models import ProfessionalProfile, Category, User, UserRole, Review, ProfessionalPortfolioImage
from app.schemas import ProfessionalProfileOut, ProfessionalProfileUpdate, ProfessionalPublicOut, ProfileImageUpdate, PortfolioImageCreate, PortfolioImageOut

router = APIRouter(prefix="/professionals", tags=["professionals"])

@router.get("/", response_model=List[ProfessionalPublicOut])
def get_all_professionals(db: Annotated[Session, Depends(get_db)]):
    avg_rating = func.coalesce(func.avg(Review.rating), 0.0).label("average_rating")
    review_count = func.count(Review.id).label("review_count")
    
    query = (
        db.query(ProfessionalProfile, avg_rating, review_count)
        .join(User, User.id == ProfessionalProfile.user_id)
        .outerjoin(Review, Review.professional_user_id == ProfessionalProfile.user_id)
        .options(
            joinedload(ProfessionalProfile.user),
            joinedload(ProfessionalProfile.categories),
        )
        .filter(
            User.is_active == True,
            User.role == UserRole.professional,
        )
        .group_by(ProfessionalProfile.id, User.id)
    )
    professionals = query.all()
    
    return [
        {
            **profile.__dict__, 
            "user": profile.user,
            "categories": profile.categories,
            "rating": {
                "average_rating": avg,
                "review_count": count
            }
        }
        for (profile, avg, count) in professionals
    ]

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


SortOption = Literal["rating_desc", "price_asc", "price_desc", "newest"]

@router.get("/search", response_model=list[ProfessionalPublicOut])
def search_professionals(
    db: Session = Depends(get_db),

    city: str | None = Query(default=None),
    category_slug: str | None = Query(default=None),

    min_price: int | None = Query(default=None, ge=0),
    max_price: int | None = Query(default=None, ge=0),

    sort: SortOption = Query(default="rating_desc"),

    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=10, ge=1, le=50),
):

    avg_rating = func.coalesce(func.avg(Review.rating), 0.0).label("average_rating")
    review_count = func.count(Review.id).label("review_count")

    query = (
        db.query(ProfessionalProfile, avg_rating, review_count)
        .join(User, User.id == ProfessionalProfile.user_id)
        .outerjoin(Review, Review.professional_user_id == ProfessionalProfile.user_id)
        .options(
            joinedload(ProfessionalProfile.user),
            joinedload(ProfessionalProfile.categories),
        )
        .filter(
            User.is_active == True,
            User.role == UserRole.professional,
        )
        .group_by(ProfessionalProfile.id, User.id)
    )

    #Filtering funcitonality
    if city:
        query = query.filter(
            func.lower(ProfessionalProfile.city) == func.lower(city)
        )

    if min_price is not None:
        query = query.filter(ProfessionalProfile.starting_price >= min_price)

    if max_price is not None:
        query = query.filter(ProfessionalProfile.starting_price <= max_price)

    if category_slug:
        query = query.join(ProfessionalProfile.categories).filter(
            Category.slug == category_slug
        )

    #Sorting part
    if sort == "rating_desc":
        query = query.order_by(desc(avg_rating))
    elif sort == "price_asc":
        query = query.order_by(asc(ProfessionalProfile.starting_price))
    elif sort == "price_desc":
        query = query.order_by(desc(ProfessionalProfile.starting_price))
    elif sort == "newest":
        query = query.order_by(desc(ProfessionalProfile.id))

    #Pagination section
    query = query.offset((page - 1) * page_size).limit(page_size)

    results = query.all()

    return [
        {
            "user_id": profile.user_id,
            "user": profile.user,
            "city": profile.city,
            "service_areas": profile.service_areas,
            "years_experience": profile.years_experience,
            "bio": profile.bio,
            "starting_price": profile.starting_price,
            "phone": profile.phone,
            "profile_image_url": profile.profile_image_url,
            "categories": profile.categories,
            "rating": {
                "average_rating": float(avg or 0.0),
                "review_count": int(count or 0),
            },
        }
        for (profile, avg, count) in results
    ]


@router.get("/public/{professional_user_id}", response_model=ProfessionalPublicOut)
def get_public_professional_profile(professional_user_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    profile = (
        db.query(ProfessionalProfile)
        .join(User, User.id == ProfessionalProfile.user_id)
        .options(joinedload(ProfessionalProfile.user), joinedload(ProfessionalProfile.categories), joinedload(ProfessionalProfile.portfolio_images))
        .filter(
            ProfessionalProfile.user_id == professional_user_id,
            User.is_active == True,
            User.role == UserRole.professional
        ).first()
    )
    
    if not profile:
        raise HTTPException(status_code=404, detail="Professional not found")
    
    if user.id != professional_user_id:
        profile.view_count += 1
        db.commit()
        db.refresh(profile)
    
    return profile


@router.patch("/me/profile-image", response_model=ProfessionalProfileOut)
def update_professional_profile_image( data: ProfileImageUpdate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    if user.role != UserRole.professional:
        raise HTTPException(status_code=403, detail="forbidden")

    profile = db.query(ProfessionalProfile).filter(ProfessionalProfile.user_id == user.id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="professional_profile_not_found")

    profile.profile_image_url = data.profile_image_url
    db.commit()
    db.refresh(profile)
    return profile


@router.post("/me/portfolio", response_model=list[PortfolioImageOut])
def add_portfolio_image(data: PortfolioImageCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    if user.role != UserRole.professional:
        raise HTTPException(status_code=403, detail="forbidden")
    
    profile = db.query(ProfessionalProfile).filter(ProfessionalProfile.user_id == user.id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="professional_profile_not_found")
    
    current_count = db.query(ProfessionalPortfolioImage).filter(ProfessionalPortfolioImage.professional_profile_id == profile.id).count()
    if current_count >= 3:
        raise HTTPException(status_code=400, detail="portfolio_limit_reached")
    
    img = ProfessionalPortfolioImage(professional_profile_id = profile.id, url = data.url)
    db.add(img)
    db.commit()
    
    portfolio = db.query(ProfessionalPortfolioImage).filter(
        ProfessionalPortfolioImage.professional_profile_id == profile.id
    ).order_by(ProfessionalPortfolioImage.id.asc()).all()
    
    return portfolio


@router.get('/me/completeness')
def get_profile_completeness(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    if user.role != UserRole.professional:
        raise HTTPException(status_code=403, detail="forbidden")

    profile = db.query(ProfessionalProfile).filter(
        ProfessionalProfile.user_id == user.id
    ).first()
    if not profile:
        raise HTTPException(status_code=404, detail="profile_not_found")

    fields = {
        "first_name":       bool(user.first_name),
        "last_name":        bool(user.last_name),
        "city":             bool(profile.city),
        "phone":            bool(profile.phone),
        "bio":              bool(profile.bio),
        "profile_image":    bool(profile.profile_image_url),
        "categories":       bool(profile.categories),
        "portfolio_images": bool(profile.portfolio_images),
        "starting_price":   bool(profile.starting_price),
        "service_areas":    bool(profile.service_areas),
    }

    completed = [k for k, v in fields.items() if v]
    missing = [k for k, v in fields.items() if not v]
    percentage = int((len(completed) / len(fields)) * 100)

    return {
        "percentage": percentage,
        "completed": completed,
        "missing": missing,
        "is_complete": percentage == 100,
    }