# API categories

URL de base : `http://localhost:3000/categories`

Utilisez `{{categoryId}}` comme identifiant de categorie enregistre apres un appel de creation.

## POST `/categories`

Creer une categorie.

Exemple de corps :

```json
{
  "name": "Accessories",
  "description": "Computer and phone accessories"
}
```

Tests Postman :

```javascript
pm.test("Le code de statut est 200", function () {
  pm.response.to.have.status(200);
});

pm.test("La reponse renvoie une categorie creee", function () {
  const body = pm.response.json();

  pm.expect(body).to.have.property("id");
  pm.expect(body).to.have.property("name");
  pm.expect(body).to.have.property("description");
  pm.expect(body).to.have.property("parentId");
  pm.expect(body).to.have.property("subCategoryIds");
  pm.expect(body).to.have.property("productIds");
  pm.expect(body).to.have.property("createdAt");
  pm.expect(body).to.have.property("updatedAt");
  pm.expect(body).to.have.property("isActive", true);
  pm.expect(body.subCategoryIds).to.be.an("array");
  pm.expect(body.productIds).to.be.an("array");

  pm.environment.set("categoryId", body.id);
});
```

## POST `/:id/products`

Lier un produit existant a une categorie.

Exemple de corps :

```json
{
  "productId": "{{productId}}"
}
```

Tests Postman :

```javascript
pm.test("Le code de statut est 200", function () {
  pm.response.to.have.status(200);
});

pm.test("La reponse confirme le lien", function () {
  const body = pm.response.json();
  pm.expect(body).to.have.property("message", "linked");
});
```
