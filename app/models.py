import enum
from sqlalchemy import String, Enum, Table, Column, Text, ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db import Base

class UserRole(str, enum.Enum):
    customer = "customer"
    professional = "professional"
    admin = "admin"

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    email: Mapped[str] = mapped_column(String(320), unique=True, index=True, nullable=False)
    first_name: Mapped[str] = mapped_column(String(100), nullable=False)
    last_name: Mapped[str] = mapped_column(String(100), nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[UserRole] = mapped_column(Enum(UserRole, name="user_role"), nullable=False, default=UserRole.customer)
    
class Category(Base):
    __tablename__ = "categories"
    
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False, unique=True)
    slug: Mapped[str] = mapped_column(String(140), nullable=False, unique=True, index=True)
    
    
#many-to-many relationship association prof <-> cat
professional_profile_categories = Table(
    "professional_profile_categories",
    Base.metadata,
    Column("professional_profile_id", ForeignKey("professional_profiles.id"), primary_key=True),
    Column("category_id", ForeignKey("categories.id"), primary_key=True),
)

class CustomerProfile(Base):
    __tablename__ = "customer_profiles"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), unique=True, nullable=False)

    city: Mapped[str | None] = mapped_column(String(120), nullable=True)
    phone: Mapped[str | None] = mapped_column(String(40), nullable=True)
    profile_image_url: Mapped[str | None] = mapped_column(String(500), nullable=True)

    user = relationship("User")

class ProfessionalProfile(Base):
    __tablename__ = "professional_profiles"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), unique=True, nullable=False)

    city: Mapped[str] = mapped_column(String(120), nullable=False)
    service_areas: Mapped[str] = mapped_column(Text, nullable=False, default="")

    years_experience: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    bio: Mapped[str | None] = mapped_column(Text, nullable=True)

    starting_price: Mapped[int | None] = mapped_column(Integer, nullable=True)

    phone: Mapped[str | None] = mapped_column(String(40), nullable=True)
    profile_image_url: Mapped[str | None] = mapped_column(String(500), nullable=True)

    user = relationship("User")
    categories = relationship("Category", secondary=professional_profile_categories, lazy="joined")
