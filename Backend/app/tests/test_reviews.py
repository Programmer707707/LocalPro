def get_user_id(client, headers):
    return client.get("/users/me", headers=headers).json()["id"]

def test_create_review_success(client, customer_headers, professional_headers):
    professional_id = get_user_id(client, professional_headers)
    response = client.post(
        f"/professionals/{professional_id}/reviews",
        headers=customer_headers,
        json={"rating": 5, "comment": "Excellent work!"}
    )
    assert response.status_code == 201
    data = response.json()
    assert data["rating"] == 5
    assert data["comment"] == "Excellent work!"

def test_create_review_without_comment(client, customer_headers, professional_headers):
    professional_id = get_user_id(client, professional_headers)
    response = client.post(
        f"/professionals/{professional_id}/reviews",
        headers=customer_headers,
        json={"rating": 4}
    )
    assert response.status_code == 201

def test_create_duplicate_review(client, customer_headers, professional_headers):
    professional_id = get_user_id(client, professional_headers)
    client.post(
        f"/professionals/{professional_id}/reviews",
        headers=customer_headers,
        json={"rating": 5, "comment": "Great!"}
    )
    response = client.post(
        f"/professionals/{professional_id}/reviews",
        headers=customer_headers,
        json={"rating": 3, "comment": "Changed my mind"}
    )
    assert response.status_code == 400
    assert response.json()["detail"] == "Review already exists"

def test_create_review_invalid_rating_too_high(client, customer_headers, professional_headers):
    professional_id = get_user_id(client, professional_headers)
    response = client.post(
        f"/professionals/{professional_id}/reviews",
        headers=customer_headers,
        json={"rating": 6}
    )
    assert response.status_code == 422

def test_create_review_invalid_rating_too_low(client, customer_headers, professional_headers):
    professional_id = get_user_id(client, professional_headers)
    response = client.post(
        f"/professionals/{professional_id}/reviews",
        headers=customer_headers,
        json={"rating": 0}
    )
    assert response.status_code == 422

def test_professional_cannot_review(client, professional_headers):
    response = client.post(
        "/professionals/99999/reviews",
        headers=professional_headers,
        json={"rating": 5}
    )
    assert response.status_code == 403

def test_get_reviews_success(client, customer_headers, professional_headers):
    professional_id = get_user_id(client, professional_headers)
    client.post(
        f"/professionals/{professional_id}/reviews",
        headers=customer_headers,
        json={"rating": 5, "comment": "Great!"}
    )
    response = client.get(f"/professionals/{professional_id}/reviews")
    assert response.status_code == 200
    reviews = response.json()
    assert len(reviews) == 1
    assert reviews[0]["rating"] == 5

def test_get_reviews_empty(client, professional_headers):
    professional_id = get_user_id(client, professional_headers)
    response = client.get(f"/professionals/{professional_id}/reviews")
    assert response.status_code == 200
    assert response.json() == []

def test_get_rating_success(client, customer_headers, professional_headers):
    professional_id = get_user_id(client, professional_headers)
    client.post(
        f"/professionals/{professional_id}/reviews",
        headers=customer_headers,
        json={"rating": 4, "comment": "Good!"}
    )
    response = client.get(f"/professionals/{professional_id}/rating")
    assert response.status_code == 200
    data = response.json()
    assert data["average_rating"] == 4.0
    assert data["review_count"] == 1

def test_get_rating_no_reviews(client, professional_headers):
    professional_id = get_user_id(client, professional_headers)
    response = client.get(f"/professionals/{professional_id}/rating")
    assert response.status_code == 200
    data = response.json()
    assert data["average_rating"] == 0.0
    assert data["review_count"] == 0