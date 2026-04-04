from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.deps import get_db
from app.models import User, UserRole
from app.schemas import RegisterIn, LoginIn, TokenOut, UserOut
from app.security import hash_password, verify_password, create_access_token
from app.models import ProfessionalProfile, CustomerProfile
from app.otp import create_otp, send_otp_email, verify_otp
from app.schemas import OTPRequest, OTPVerify

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=UserOut, status_code=201)
def register(data: RegisterIn, db: Session = Depends(get_db)):
    exists = db.query(User).filter(User.email == data.email).first()
    if exists:
        raise HTTPException(status_code=409, detail="email_already_used")
    
    role = UserRole(data.role) if data.role else UserRole.customer
    
    user = User(
        email=data.email,
        first_name=data.first_name,
        last_name=data.last_name,
        password_hash=hash_password(data.password),
        role=role,
    )
    
    db.add(user)
    db.flush()
    
    if data.role == "professional":
        profile = ProfessionalProfile(
            user_id=user.id,
            city="",
            service_areas="",
            years_experience=0,
        )
        db.add(profile)
    elif data.role == "customer":
        profile = CustomerProfile(user_id=user.id)
        db.add(profile)
    
    try:
        db.commit()
        db.refresh(user)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Database error")
    
    return user

@router.post("/login", response_model=TokenOut)
def login(data: LoginIn, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="invalid_credentials")
    
    if not user.is_active:
        raise HTTPException(status_code=403, detail="account_disabled")

    token = create_access_token(subject=str(user.id), role=user.role.value)
    return TokenOut(access_token=token)


@router.post("/request-otp")
def request_otp(data: OTPRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        return {"message": "If that email exists, a code was sent."}
    if not user.is_active:
        raise HTTPException(status_code=403, detail="account_disabled")

    code = create_otp(db, data.email)
    try:
        send_otp_email(data.email, code)
    except Exception:
        raise HTTPException(status_code=500, detail="failed_to_send_email")

    return {"message": "OTP sent to your email."}


@router.post("/verify-otp", response_model=TokenOut)
def verify_otp_and_login(data: OTPVerify, db: Session = Depends(get_db)):
    if not verify_otp(db, data.email, data.code):
        raise HTTPException(status_code=400, detail="invalid_or_expired_otp")

    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="user_not_found")

    token = create_access_token(subject=str(user.id), role=user.role.value)
    return TokenOut(access_token=token)

@router.post("/logout")
def logout():
    return {"status": "ok"}
