def get_user_id(client, headers):
    return client.get("/users/me", headers=headers).json()["id"]

def test_report_profile_success(client, customer_headers, professional_headers):
    professional_id = get_user_id(client, professional_headers)
    response = client.post(
        f"/reports/profile/{professional_id}",
        headers=customer_headers,
        json={"reason": "spam", "comment": "This is spam"}
    )
    assert response.status_code == 201
    data = response.json()
    assert data["reason"] == "spam"
    assert data["status"] == "pending"

def test_report_profile_without_comment(client, customer_headers, professional_headers):
    professional_id = get_user_id(client, professional_headers)
    response = client.post(
        f"/reports/profile/{professional_id}",
        headers=customer_headers,
        json={"reason": "fake"}
    )
    assert response.status_code == 201

def test_report_profile_duplicate(client, customer_headers, professional_headers):
    professional_id = get_user_id(client, professional_headers)
    client.post(
        f"/reports/profile/{professional_id}",
        headers=customer_headers,
        json={"reason": "spam"}
    )
    response = client.post(
        f"/reports/profile/{professional_id}",
        headers=customer_headers,
        json={"reason": "fake"}
    )
    assert response.status_code == 400

def test_report_profile_invalid_reason(client, customer_headers, professional_headers):
    professional_id = get_user_id(client, professional_headers)
    response = client.post(
        f"/reports/profile/{professional_id}",
        headers=customer_headers,
        json={"reason": "invalid_reason"}
    )
    assert response.status_code == 422

def test_report_profile_unauthenticated(client, professional_headers):
    professional_id = get_user_id(client, professional_headers)
    response = client.post(
        f"/reports/profile/{professional_id}",
        json={"reason": "spam"}
    )
    assert response.status_code == 401

def test_report_review_success(client, customer_headers, professional_headers):
    professional_id = get_user_id(client, professional_headers)
    review_response = client.post(
        f"/professionals/{professional_id}/reviews",
        headers=customer_headers,
        json={"rating": 5, "comment": "Great!"}
    )
    review_id = review_response.json()["id"]
    response = client.post(
        f"/reports/review/{review_id}",
        headers=professional_headers,
        json={"reason": "offensive", "comment": "This is offensive"}
    )
    assert response.status_code == 201
    data = response.json()
    assert data["reason"] == "offensive"
    assert data["status"] == "pending"

def test_report_review_duplicate(client, customer_headers, professional_headers):
    professional_id = get_user_id(client, professional_headers)
    review_response = client.post(
        f"/professionals/{professional_id}/reviews",
        headers=customer_headers,
        json={"rating": 5, "comment": "Great!"}
    )
    review_id = review_response.json()["id"]
    client.post(
        f"/reports/review/{review_id}",
        headers=professional_headers,
        json={"reason": "offensive"}
    )
    response = client.post(
        f"/reports/review/{review_id}",
        headers=professional_headers,
        json={"reason": "spam"}
    )
    assert response.status_code == 400

def test_report_nonexistent_review(client, customer_headers):
    response = client.post(
        "/reports/review/99999",
        headers=customer_headers,
        json={"reason": "spam"}
    )
    assert response.status_code == 404