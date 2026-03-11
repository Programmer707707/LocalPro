from sqladmin import ModelView
from app.models import (
    User,
    CustomerProfile,
    ProfessionalProfile,
    ProfessionalPortfolioImage,
    Category,
    Review,
    Report
)

#configurations' source: https://aminalaee.github.io/sqladmin/configurations/

class UserAdmin(ModelView, model=User):
    can_create = True 
    can_delete = False 
    can_edit = True
    
    column_list = [User.id, User.email, User.first_name, User.last_name, User.role, User.is_active]
    column_searchable_list = [User.email, User.first_name, User.last_name]
    column_sortable_list = [User.id, User.email, User.role]
    form_columns = [
        User.first_name,
        User.last_name,
        User.role,
        User.is_active,
    ]
    name = "User"
    name_plural = "Users"
    icon = "fa-solid fa-user"

class CategoryAdmin(ModelView, model=Category):
    column_list = [Category.id, Category.name, Category.slug]
    column_searchable_list = [Category.name, Category.slug]
    name = "Category"
    name_plural = "Categories"
    icon = "fa-solid fa-list"

class CustomerProfileAdmin(ModelView, model=CustomerProfile):
    column_list = [CustomerProfile.id, CustomerProfile.user_id, CustomerProfile.city, CustomerProfile.phone, CustomerProfile.profile_image_url]
    column_searchable_list = [CustomerProfile.city, CustomerProfile.phone]
    name = "Customer Profile"
    name_plural = "Customer Profiles"
    icon = "fa-solid fa-people-group"

class ProfessionalProfileAdmin(ModelView, model=ProfessionalProfile):
    column_list = [ProfessionalProfile.id, ProfessionalProfile.user_id, ProfessionalProfile.city, ProfessionalProfile.years_experience, ProfessionalProfile.starting_price, ProfessionalProfile.phone]
    column_searchable_list = [ProfessionalProfile.city, ProfessionalProfile.phone]
    column_sortable_list = [ProfessionalProfile.id, ProfessionalProfile.years_experience, ProfessionalProfile.starting_price]
    name = "Professional Profile"
    name_plural = "Professional Profiles"
    icon = "fa-solid fa-briefcase"

class ReviewAdmin(ModelView, model=Review):
    column_list = [Review.id, Review.professional_user_id, Review.customer_user_id, Review.rating, Review.comment, Review.created_at]
    column_sortable_list = [Review.id, Review.rating, Review.created_at]
    name = "Review"
    name_plural = "Reviews"
    icon = "fa-solid fa-star"

class PortfolioImageAdmin(ModelView, model=ProfessionalPortfolioImage):
    column_list = [ProfessionalPortfolioImage.id, ProfessionalPortfolioImage.professional_profile_id, ProfessionalPortfolioImage.url, ProfessionalPortfolioImage.created_at]
    column_sortable_list = [ProfessionalPortfolioImage.id, ProfessionalPortfolioImage.created_at]
    name = "Portfolio Image"
    name_plural = "Portfolio Images"
    icon = "fa-solid fa-image"
    
    
class ReportAdmin(ModelView, model=Report):
    column_list = [
        Report.id,
        Report.reporter_user_id,
        Report.reported_user_id,
        Report.reported_review_id,
        Report.reason,
        Report.status,
        Report.created_at
    ]
    
    column_sortable_list = [Report.id, Report.status, Report.reason, Report.created_at]
    name = "Report"
    name_plural = "Reports"
    icon = "fa-solid fa-flag"