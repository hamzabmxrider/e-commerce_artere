# API produits

URL de base : `http://localhost:3000/products`

Utilisez `{{productId}}` comme identifiant produit enregistre apres un appel de creation.

## POST `/products`

Creer un produit.

Exemple de corps :

```json
{
  "name": "Keyboard",
  "price": 49.99,
  "stockQuantity": 25
}
```

Tests Postman :

```javascript
pm.test("Le code de statut est 200", function () {
  pm.response.to.have.status(200);
});

pm.test("La reponse renvoie un produit cree", function () {
  const body = pm.response.json();

  pm.expect(body).to.have.property("id");
  pm.expect(body).to.have.property("name");
  pm.expect(body).to.have.property("price");
  pm.expect(body).to.have.property("stockQuantity");
  pm.expect(body).to.have.property("createdAt");
  pm.expect(body).to.have.property("updatedAt");
  pm.expect(body).to.have.property("isActive", true);

  pm.environment.set("productId", body.id);
});
```

## PUT `/:id`

Mettre a jour un produit par identifiant.

Exemple de corps :

```json
{
  "name": "Mechanical Keyboard",
  "price": 59.99,
  "stockQuantity": 18
}
```

Tests Postman :

```javascript
pm.test("Le code de statut est 200", function () {
  pm.response.to.have.status(200);
});

pm.test("L'identifiant du produit reste identique", function () {
  const body = pm.response.json();
  pm.expect(body.id).to.eql(pm.environment.get("productId"));
});

pm.test("La reponse contient les champs mis a jour", function () {
  const body = pm.response.json();
  const payload = JSON.parse(pm.request.body.raw);

  if (payload.name !== undefined) {
    pm.expect(body.name).to.eql(payload.name);
  }

  if (payload.price !== undefined) {
    pm.expect(body.price).to.eql(payload.price);
  }

  if (payload.stockQuantity !== undefined) {
    pm.expect(body.stockQuantity).to.eql(payload.stockQuantity);
  }
});
```

## DELETE `/:id`

Supprimer un produit par identifiant.

Tests Postman :

```javascript
pm.test("Le code de statut est 200", function () {
  pm.response.to.have.status(200);
});

pm.test("La reponse confirme la suppression", function () {
  const body = pm.response.json();
  pm.expect(body).to.have.property("message", "deleted");
});
```
