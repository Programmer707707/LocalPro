def get_user_id(client, headers):
    return client.get("/users/me", headers=headers).json()["id"]

def test_add_favorite_success(client, customer_headers, professional_headers):
    professional_id = get_user_id(client, professional_headers)
    response = client.post(
        f"/favorites/{professional_id}",
        headers=customer_headers
    )
    assert response.status_code == 201

def test_add_duplicate_favorite(client, customer_headers, professional_headers):
    professional_id = get_user_id(client, professional_headers)
    client.post(f"/favorites/{professional_id}", headers=customer_headers)
    response = client.post(f"/favorites/{professional_id}", headers=customer_headers)
    assert response.status_code == 400
    assert response.json()["detail"] == "already_in_favorites"

def test_cannot_favorite_yourself(client, professional_headers):
    professional_id = get_user_id(client, professional_headers)
    response = client.post(
        f"/favorites/{professional_id}",
        headers=professional_headers
    )
    assert response.status_code == 400
    assert response.json()["detail"] == "cannot favorite yourself"

def test_add_favorite_nonexistent_professional(client, customer_headers):
    response = client.post("/favorites/99999", headers=customer_headers)
    assert response.status_code == 404

def test_remove_favorite_success(client, customer_headers, professional_headers):
    professional_id = get_user_id(client, professional_headers)
    client.post(f"/favorites/{professional_id}", headers=customer_headers)
    response = client.delete(
        f"/favorites/{professional_id}",
        headers=customer_headers
    )
    assert response.status_code == 204

def test_remove_nonexistent_favorite(client, customer_headers, professional_headers):
    professional_id = get_user_id(client, professional_headers)
    response = client.delete(
        f"/favorites/{professional_id}",
        headers=customer_headers
    )
    assert response.status_code == 404

def test_list_favorites_empty(client, customer_headers):
    response = client.get("/favorites", headers=customer_headers)
    assert response.status_code == 200
    assert response.json() == []

def test_professional_cannot_check_favorite(client, professional_headers, customer_headers):
    customer_id = get_user_id(client, customer_headers)
    response = client.get(
        f"/favorites/{customer_id}/check",
        headers=professional_headers
    )
    assert response.status_code == 403