from typing import Optional, Literal
from pydantic import BaseModel, Field, EmailStr

Role = Literal["customer", "professional", "admin"]


class RegisterIn(BaseModel):
    email: EmailStr
    first_name: str = Field(min_length=2, max_length=100)
    last_name: str = Field(min_length=2, max_length=100)
    password: str = Field(min_length=8, max_length=72)
    role: Optional[Role] = "customer"

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
    
    model_config = {"from_attributes": True}
    
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

#helper schema
class UserPublicOut(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr

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

    model_config = {"from_attributes": True}