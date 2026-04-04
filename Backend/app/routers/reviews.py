from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.deps import get_db, get_current_user
from app.models import Review, User, UserRole
from app.schemas import ReviewCreate, ReviewOut, RatingSummaryOut

router = APIRouter(prefix="/professionals", tags=["reviews"])


@router.post("/{professional_user_id}/reviews", response_model=ReviewOut, status_code=201)
def create_review(
    professional_user_id: int,
    data: ReviewCreate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    if user.role != UserRole.customer:
        raise HTTPException(status_code=403, detail="Only customers can review")

    professional = db.query(User).filter(
        User.id == professional_user_id,
        User.role == UserRole.professional,
        User.is_active == True
    ).first()

    if not professional:
        raise HTTPException(status_code=404, detail="Professional not found")

    existing = db.query(Review).filter(
        Review.professional_user_id == professional_user_id,
        Review.customer_user_id == user.id
    ).first()

    if existing:
        raise HTTPException(status_code=400, detail="Review already exists")

    review = Review(
        professional_user_id=professional_user_id,
        customer_user_id=user.id,
        rating=data.rating,
        comment=data.comment
    )

    db.add(review)
    db.commit()
    db.refresh(review)

    return review


@router.get("/{professional_user_id}/reviews", response_model=list[ReviewOut])
def get_reviews(professional_user_id: int, db: Session = Depends(get_db)):
    reviews = db.query(Review).filter(
        Review.professional_user_id == professional_user_id
    ).order_by(Review.created_at.desc()).all()

    return reviews


@router.get("/{professional_user_id}/rating", response_model=RatingSummaryOut)
def get_rating_summary(professional_user_id: int, db: Session = Depends(get_db)):
    result = db.query(
        func.avg(Review.rating),
        func.count(Review.id)
    ).filter(
        Review.professional_user_id == professional_user_id
    ).first()

    average = float(result[0]) if result[0] else 0.0
    count = result[1]

    return {
        "average_rating": round(average, 2),
        "review_count": count
    }
