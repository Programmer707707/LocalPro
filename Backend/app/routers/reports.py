from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.deps import get_db, get_current_user
from app.models import Report, User, Review, ReportReason, ReportStatus
from app.schemas import ReportProfileCreate, ReportReviewCreate, ReportOut

router = APIRouter(prefix="/reports", tags=["Reports"])


@router.post("/profile/{reported_user_id}", response_model=ReportOut, status_code=201)
def report_profile(
    reported_user_id: int,
    data: ReportProfileCreate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    if user.id == reported_user_id:
        raise HTTPException(status_code=400, detail="cannot_report_yourself")

    target = db.query(User).filter(User.id == reported_user_id).first()
    if not target:
        raise HTTPException(status_code=404, detail="user_not_found")

    existing = db.query(Report).filter(
        Report.reporter_user_id == user.id,
        Report.reported_user_id == reported_user_id,
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="already_reported")

    report = Report(
        reporter_user_id=user.id,
        reported_user_id=reported_user_id,
        reason=data.reason,
        comment=data.comment,
        status=ReportStatus.pending,
    )
    db.add(report)
    db.commit()
    db.refresh(report)
    return report


@router.post("/review/{review_id}", response_model=ReportOut, status_code=201)
def report_review(
    review_id: int,
    data: ReportReviewCreate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    review = db.query(Review).filter(Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="review_not_found")

    if review.customer_user_id == user.id:
        raise HTTPException(status_code=400, detail="cannot_report_your_own_review")

    existing = db.query(Report).filter(
        Report.reporter_user_id == user.id,
        Report.reported_review_id == review_id,
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="already_reported")

    report = Report(
        reporter_user_id=user.id,
        reported_review_id=review_id,
        reason=data.reason,
        comment=data.comment,
        status=ReportStatus.pending,
    )
    db.add(report)
    db.commit()
    db.refresh(report)
    return report