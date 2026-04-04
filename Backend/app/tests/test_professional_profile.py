def test_get_my_profile_success(client, professional_headers):
    response = client.get("/professionals/me", headers=professional_headers)
    assert response.status_code == 200
    data = response.json()
    assert "city" in data
    assert "categories" in data
    assert "portfolio_images" in data

def test_get_my_profile_as_customer_forbidden(client, customer_headers):
    response = client.get("/professionals/me", headers=customer_headers)
    assert response.status_code == 403

def test_get_my_profile_unauthenticated(client):
    response = client.get("/professionals/me")
    assert response.status_code == 401

def test_update_profile_success(client, professional_headers):
    response = client.put("/professionals/me", headers=professional_headers, json={
        "city": "Budapest",
        "bio": "Experienced plumber",
        "years_experience": 5,
        "starting_price": 5000,
        "phone": "+36201234567",
        "service_areas": "district v, district vi",
        "category_ids": []
    })
    assert response.status_code == 200
    data = response.json()
    assert data["city"] == "Budapest"
    assert data["bio"] == "Experienced plumber"
    assert data["years_experience"] == 5

def test_get_public_profile_success(client, professional_headers):
    me_response = client.get("/users/me", headers=professional_headers)
    professional_id = me_response.json()["id"]

    response = client.get(f"/professionals/public/{professional_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["user_id"] == professional_id
    assert "rating" in data
    assert "portfolio_images" in data
    assert "categories" in data

def test_get_public_profile_not_found(client):
    response = client.get("/professionals/public/99999")
    assert response.status_code == 404

def test_search_professionals_by_city(client, professional_headers):
    client.put("/professionals/me", headers=professional_headers, json={
        "city": "Budapest",
        "years_experience": 1,
        "service_areas": "",
        "category_ids": []
    })
    response = client.get("/professionals/search?city=Budapest")
    assert response.status_code == 200
    results = response.json()
    assert len(results) > 0
    assert all(r["city"] == "Budapest" for r in results)

def test_search_professionals_by_category(client, professional_headers, test_category):
    client.put("/professionals/me", headers=professional_headers, json={
        "city": "Budapest",
        "years_experience": 1,
        "service_areas": "",
        "category_ids": [test_category.id]
    })
    response = client.get(f"/professionals/search?category_slug={test_category.slug}")
    assert response.status_code == 200
    results = response.json()
    assert len(results) > 0

def test_search_professionals_by_min_price(client, professional_headers):
    client.put("/professionals/me", headers=professional_headers, json={
        "city": "Budapest",
        "years_experience": 1,
        "service_areas": "",
        "starting_price": 5000,
        "category_ids": []
    })
    response = client.get("/professionals/search?min_price=3000")
    assert response.status_code == 200
    results = response.json()
    assert all(r["starting_price"] >= 3000 for r in results if r["starting_price"])

def test_profile_completeness(client, professional_headers):
    response = client.get("/professionals/me/completeness", headers=professional_headers)
    assert response.status_code == 200
    data = response.json()
    assert "percentage" in data
    assert "completed" in data
    assert "missing" in data
    assert "is_complete" in data
    assert isinstance(data["percentage"], (int, float))
    assert 0 <= data["percentage"] <= 100