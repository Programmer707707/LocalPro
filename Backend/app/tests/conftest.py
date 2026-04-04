#source = https://www.fastapitutorial.com/blog/fastapi-unit-testing-setup/
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.main import app
from app.db import Base
from app.deps import get_db
from app.config import settings
from app.models import Category

engine = create_engine(url = settings.SQLALCHEMY_TEST_DATABASE_URL, connect_args = {"check_same_thread": False})

TestingSessionLocal = sessionmaker(
    autocommit = False,
    autoflush = False,
    bind = engine
)

def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db 
    finally:
        db.close()
        
app.dependency_overrides[get_db] = override_get_db

@pytest.fixture(scope="function", autouse=True)
def setup_database():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

@pytest.fixture(scope="function")
def client():
    return TestClient(app)

@pytest.fixture
def customer_data():
    return {
        "email": "customer@test.com",
        "first_name": "John",
        "last_name": "Doe",
        "password": "Test@1234",
        "role": "customer"
    }

@pytest.fixture
def professional_data():
    return {
        "email": "pro@test.com",
        "first_name": "Jane",
        "last_name": "Smith",
        "password": "Test@1234",
        "role": "professional"
    }
    

@pytest.fixture
def registered_customer(client, customer_data):
    client.post("/auth/register", json=customer_data)
    response = client.post("/auth/login", json={
        "email": customer_data["email"],
        "password": customer_data["password"]
    })
    token = response.json()["access_token"]
    return {"token": token, "data": customer_data}

@pytest.fixture
def registered_professional(client, professional_data):
    client.post("/auth/register", json=professional_data)
    response = client.post("/auth/login", json={
        "email": professional_data["email"],
        "password": professional_data["password"]
    })
    token = response.json()["access_token"]
    return {"token": token, "data": professional_data}

@pytest.fixture
def customer_headers(registered_customer):
    return {"Authorization": f"Bearer {registered_customer['token']}"}

@pytest.fixture
def professional_headers(registered_professional):
    return {"Authorization": f"Bearer {registered_professional['token']}"}

@pytest.fixture
def test_category():
    db = TestingSessionLocal()
    try:
        category = Category(
            name="Construction & Repair",
            slug="construction-repair",
            suggestions="plumbing, electrical"
        )
        db.add(category)
        db.commit()
        db.refresh(category)
        return category
    finally:
        db.close()