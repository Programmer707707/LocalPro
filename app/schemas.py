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
    
class CategoryOut(BaseModel):
    id: int
    name: str
    slug: str 
    
    model_config = {"from_attributes": True}
    