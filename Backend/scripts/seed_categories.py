import re
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.db import SessionLocal
from app.models import Category
from sqlalchemy import text

def slugify(text: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")

CATEGORIES = [
    ("Construction & Repair", "plumbing, electrical, painting, roofing, flooring, welding, tiling, carpentry, masonry, waterproofing, locksmith, windows and doors"),
    ("Auto Services", "car wash, oil change, tire repair, auto detailing, engine repair, brake service, battery replacement, car painting"),
    ("Appliance Repair", "washing machine, refrigerator, air conditioner, tv repair, microwave, dishwasher, oven repair, water heater"),
    ("Household Services", "house cleaning, gardening, pest control, moving, furniture assembly, window cleaning, pool cleaning, laundry"),
    ("Education & Courses", "math tutoring, language lessons, music lessons, driving school, coding, drawing, cooking classes, yoga"),
    ("Marketing & Advertising", "social media, seo, graphic design, video production, copywriting, photo editing, logo design, content creation, video montage"),
    ("Legal & Finance", "legal consultation, tax services, accounting, notary, insurance, business registration, contract drafting"),
    ("Beauty & Health", "haircut, massage, manicure, makeup, personal training, nail art, eyebrow design, facial, pedicure, hair coloring"),
    ("IT & Tech Support", "software development, computer repair, laptop repair, virus removal, network setup, wifi installation, data recovery, software installation, printer setup, smart home setup"),
    ("Photography & Videography", "wedding photography, portrait photography, product photography, real estate photography, event videography, drone footage, photo printing"),
    ("Events & Entertainment", "wedding planning, event decoration, catering, DJ services, live music, birthday party planning, balloon decoration, master of ceremonies"),
    ("Pet Services", "dog walking, pet grooming, pet sitting, veterinary home visit, pet training, aquarium setup"),
    ("Delivery & Logistics", "courier delivery, furniture delivery, cargo transport, airport transfer, grocery delivery, document delivery"),
    ("Design & Architecture", "interior design, landscape design, 3d rendering, architectural drawing, space planning, furniture design"),
    ("Childcare & Elderly Care", "babysitting, nanny services, elderly care, disability assistance, after school care, homework help"),
    ("Food & Catering", "home cooking, meal prep, private chef, baking, wedding cake, catering for events, food delivery"),
    ("Fitness & Wellness", "personal trainer, yoga instructor, nutritionist, physiotherapy, meditation coach, pilates, boxing coach"),
    ("Translation & Interpretation", "document translation, live interpretation, subtitling, proofreading, certified translation, language consulting"),
]

def seed():
    db = SessionLocal()
    try:
        """
        db.execute(text("DELETE FROM professional_profile_categories"))
        db.commit()
        print("Cleared professional_profile_categories")
        """
        db.execute(text("TRUNCATE TABLE professional_profile_categories RESTART IDENTITY CASCADE"))
        db.execute(text("TRUNCATE TABLE categories RESTART IDENTITY CASCADE"))
        db.commit()
        print("Cleared and reset IDs")
        
        db.query(Category).delete()
        db.commit()
        print("Cleared old categories")

        for name, suggestions in CATEGORIES:
            slug = slugify(name)
            db.add(Category(name=name, slug=slug, suggestions=suggestions))
            print(f"{name}")

        db.commit()
        print("\nDone")
    finally:
        db.close()

if __name__ == "__main__":
    seed()