def test_register_customer_success(client, customer_data):
    response = client.post("/auth/register", json=customer_data)
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == customer_data["email"]
    assert data["first_name"] == customer_data["first_name"]
    assert data["last_name"] == customer_data["last_name"]
    assert data["role"] == "customer"

def test_register_professional_success(client, professional_data):
    response = client.post("/auth/register", json=professional_data)
    assert response.status_code == 201
    data = response.json()
    assert data["role"] == "professional"

def test_register_password_too_short(client):
    response = client.post("/auth/register", json={
        "email": "test@test.com",
        "first_name": "John",
        "last_name": "Doe",
        "password": "T@1",  
        "role": "customer"
    })
    assert response.status_code == 422

def test_register_invalid_email(client):
    response = client.post("/auth/register", json={
        "email": "notanemail",
        "first_name": "John",
        "last_name": "Doe",
        "password": "Test@1234",
        "role": "customer"
    })
    assert response.status_code == 422

def test_login_success(client, customer_data):
    client.post("/auth/register", json=customer_data)
    response = client.post("/auth/login", json={
        "email": customer_data["email"],
        "password": customer_data["password"]
    })
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

def test_login_wrong_password(client, customer_data):
    client.post("/auth/register", json=customer_data)
    response = client.post("/auth/login", json={
        "email": customer_data["email"],
        "password": "WrongPass@1"
    })
    assert response.status_code == 401

def test_login_wrong_email(client):
    response = client.post("/auth/login", json={
        "email": "nonexistent@test.com",
        "password": "Test@1234"
    })
    assert response.status_code == 401

def test_get_me_authenticated(client, registered_customer, customer_headers):
    response = client.get("/users/me", headers=customer_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == registered_customer["data"]["email"]
    assert data["role"] == "customer"

def test_get_me_unauthenticated(client):
    response = client.get("/users/me")
    assert response.status_code == 401

def test_get_me_invalid_token(client):
    response = client.get(
        "/users/me",
        headers={"Authorization": "Bearer invalidtoken"}
    )
    assert response.status_code == 401