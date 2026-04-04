import re
from typing import Optional, Literal
from pydantic import BaseModel, Field, EmailStr, field_validator
from app.models import ReportStatus, ReportReason
from datetime import datetime

Role = Literal["customer", "professional", "admin"]


class RegisterIn(BaseModel):
    email: EmailStr
    first_name: str = Field(min_length=2, max_length=100)
    last_name: str = Field(min_length=2, max_length=100)
    password: str = Field(min_length=8, max_length=72)
    role: Optional[Role] = "customer"
    
    @field_validator('password')
    @classmethod
    def validate_method(cls, value: str) -> str:
        if len(value) < 8:
            raise ValueError("Password must be at least 8 characters long.")
        if not re.search(r"[A-Z]", value):
            raise ValueError("Password must contain at least one uppercase letter.")
        if not re.search(r"[0-9]", value):
            raise ValueError("Password must contain at least one number.")
        if not re.search(r"[!@#$%^&*(),.?\":{}|<>_\-\\/\[\]+=`~;']", value):
            raise ValueError("Password must contain at least one special character.")
        return value

class LoginIn(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=72)

class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"

class UserOut(BaseModel):
    id: int
    email: EmailStr
    first_name: str
    last_name: str
    role: Role

    model_config = {"from_attributes": True}
    
class UserUpdate(BaseModel):
    email: EmailStr | None = None
    first_name: str | None = Field(default=None, min_length=2, max_length=100)
    last_name: str | None = Field(default=None, min_length=2, max_length=100)

   
   
# Category 
class CategoryOut(BaseModel):
    id: int
    name: str
    slug: str 
    suggestions: list[str]
    
    model_config = {"from_attributes": True}
    @field_validator("suggestions", mode="before")
    @classmethod
    def parse_suggestions(cls, v):
        if isinstance(v, str):
            return [s.strip() for s in v.split(",") if s.strip()]
        return v
    
class CategoryCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    
    
#Profile schemas -> user & prof (out, update)
class CustomerProfileOut(BaseModel):
    city: str | None
    phone: str | None
    profile_image_url: str | None

    model_config = {"from_attributes": True}

class CustomerProfileUpdate(BaseModel):
    city: str | None = None
    phone: str | None = None
    profile_image_url: str | None = None 

class ProfessionalProfileOut(BaseModel):
    city: str
    service_areas: str
    years_experience: int
    bio: str | None
    starting_price: int | None
    phone: str | None
    profile_image_url: str | None
    categories: list[CategoryOut]
    view_count: int = 0
    portfolio_images: list["PortfolioImageOut"] = []
    revolut_tag: str | None = None
    wise_tag: str | None = None

    model_config = {"from_attributes": True}

class ProfessionalProfileUpdate(BaseModel):
    city: str | None = None
    service_areas: str | None = None
    years_experience: int | None = None
    bio: str | None = None
    starting_price: int | None = None
    phone: str | None = None
    profile_image_url: str | None = None
    category_ids: list[int] | None = None
    revolut_tag: str | None = None
    wise_tag: str | None = None

#helper schema
class UserPublicOut(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr

    model_config = {"from_attributes": True}
    


#Rating schemas
class ReviewCreate(BaseModel):
    rating: int = Field(ge=1, le=5)
    comment: str | None = Field(default=None, max_length=1000)
    
class ReviewOut(BaseModel):
    id: int 
    rating: int 
    comment: str | None
    created_at: datetime
    
    model_config = {"from_attributes": True} 

class RatingSummaryOut(BaseModel):
    average_rating: float 
    review_count: int
    

#Portfolio schemas
class ProfileImageUpdate(BaseModel):
    profile_image_url: str

class PortfolioImageCreate(BaseModel):
    url: str

class PortfolioImageOut(BaseModel):
    id: int
    url: str
    created_at: datetime

    model_config = {"from_attributes": True}


#Public schema for professional
class ProfessionalPublicOut(BaseModel):
    user_id: int
    user: UserPublicOut
    city: str
    service_areas: str
    years_experience: int
    bio: str | None
    starting_price: int | None
    phone: str | None
    profile_image_url: str | None
    categories: list[CategoryOut]
    rating: RatingSummaryOut
    portfolio_images: list[PortfolioImageOut]
    view_count: int
    revolut_tag: str | None = None
    wise_tag: str | None = None

    model_config = {"from_attributes": True}
    

#Favorites
class FavoriteOut(BaseModel):
    professional_user_id: int 
    professional: UserPublicOut
    created_at: datetime
    
    model_config = {"from_attributes": True}
    
    
#Reports
class ReportProfileCreate(BaseModel):
    reason: ReportReason
    comment: str | None = Field(default=None, max_length=500)

class ReportReviewCreate(BaseModel):
    reason: ReportReason
    comment: str | None = Field(default=None, max_length=500)

class ReportOut(BaseModel):
    id: int
    reason: ReportReason
    status: ReportStatus
    comment: str | None
    created_at: datetime

    model_config = {"from_attributes": True}
    
class OTPRequest(BaseModel):
    email: str

class OTPVerify(BaseModel):
    email: str
    code: str