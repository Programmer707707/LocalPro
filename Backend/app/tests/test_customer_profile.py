def test_get_customer_profile_success(client, customer_headers):
    response = client.get("/customers/me", headers=customer_headers)
    assert response.status_code == 200
    data = response.json()
    assert "city" in data
    assert "phone" in data
    assert "profile_image_url" in data

def test_get_customer_profile_unauthenticated(client):
    response = client.get("/customers/me")
    assert response.status_code == 401

def test_update_customer_profile_success(client, customer_headers):
    response = client.put("/customers/me", headers=customer_headers, json={
        "city": "Budapest",
        "phone": "+36201234567"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["city"] == "Budapest"
    assert data["phone"] == "+36201234567"

def test_update_customer_profile_partial(client, customer_headers):
    response = client.put("/customers/me", headers=customer_headers, json={
        "city": "Debrecen"
    })
    assert response.status_code == 200
    assert response.json()["city"] == "Debrecen"

def test_update_customer_profile_image(client, customer_headers):
    response = client.patch(
        "/customers/me/profile_image",
        headers=customer_headers,
        json={"profile_image_url": "https://example.com/image.jpg"}
    )
    assert response.status_code == 200
    assert response.json()["profile_image_url"] == "https://example.com/image.jpg"