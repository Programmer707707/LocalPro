import random
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from app.models import OTPCode
from app.config import settings

SMTP_HOST = settings.SMTP_HOST
SMTP_PORT = settings.SMTP_PORT
SMTP_USER = settings.GMAIL_USER     
SMTP_PASS = settings.GMAIL_APP_PASSWORD

def generate_otp() -> str:
    return str(random.randint(100000, 999999))

def send_otp_email(to_email: str, code: str):
    msg = MIMEMultipart("alternative")
    msg["Subject"] = "Your LocalPro verification code"
    msg["From"] = SMTP_USER
    msg["To"] = to_email

    html = f"""
    <html><body>
      <h2>Your verification code</h2>
      <p>Use the code below to sign in. It expires in 10 minutes.</p>
      <h1 style="letter-spacing:8px;color:#4f46e5">{code}</h1>
      <p style="color:gray;font-size:12px">If you didn't request this, ignore this email.</p>
    </body></html>
    """
    msg.attach(MIMEText(html, "html"))

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
        server.starttls()
        server.login(SMTP_USER, SMTP_PASS)
        server.sendmail(SMTP_USER, to_email, msg.as_string())

def create_otp(db: Session, email: str) -> str:
    db.query(OTPCode).filter(OTPCode.email == email, OTPCode.is_used == False).delete()
    db.commit()

    code = generate_otp()
    otp = OTPCode(
        email=email,
        code=code,
        expires_at=datetime.utcnow() + timedelta(minutes=10),
    )
    db.add(otp)
    db.commit()
    return code

def verify_otp(db: Session, email: str, code: str) -> bool:
    otp = (
        db.query(OTPCode)
        .filter(
            OTPCode.email == email,
            OTPCode.code == code,
            OTPCode.is_used == False,
            OTPCode.expires_at > datetime.utcnow(),
        )
        .first()
    )
    if not otp:
        return False
    otp.is_used = True
    db.commit()
    return True