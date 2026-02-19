import re
from sqlalchemy.orm import Session

from app.db import SessionLocal
from app.models import Category

CATEGORIES = [
    "Plumbing",
    "Electrical",
    "Carpentry",
    "Painting",
    "Heating & Gas",
    "Appliance Repair",
    "Furniture Assembly",
    "Tiling",
    "Locksmith",
    "Cleaning",
    "Gardening",
    "Moving Help",
    "Windows & Doors",
]

def slugify(text: str) -> str:
    s = text.lower().strip()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = re.sub(r"-{2,}", "-", s).strip("-")
    return s

def main():
    db: Session = SessionLocal()
    try:
        existing = {c.slug for c in db.query(Category).all()}
        added = 0
        for name in CATEGORIES:
            slug = slugify(name)
            if slug in existing:
                continue
            db.add(Category(name=name, slug=slug))
            existing.add(slug)
            added += 1
        db.commit()
        print(f"seeded {added} categories")
    finally:
        db.close()

if __name__ == "__main__":
    main()
