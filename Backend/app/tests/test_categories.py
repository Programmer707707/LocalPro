def test_get_categories_empty(client):
    response = client.get("/categories/")
    assert response.status_code == 200
    assert response.json() == []

def test_get_categories_with_data(client, test_category):
    response = client.get("/categories/")
    assert response.status_code == 200
    categories = response.json()
    assert len(categories) == 1
    assert categories[0]["name"] == test_category.name
    assert categories[0]["slug"] == test_category.slug

def test_category_suggestions_parsed_as_list(client, test_category):
    response = client.get("/categories/")
    assert response.status_code == 200
    category = response.json()[0]
    assert isinstance(category["suggestions"], list)
    assert "plumbing" in category["suggestions"]
    assert "electrical" in category["suggestions"]