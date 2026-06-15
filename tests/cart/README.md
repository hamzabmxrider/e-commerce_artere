# API panier

URL de base : `http://localhost:3000/cart`

Cette API attend un identifiant de produit existant provenant de l'API produits.

## POST `/add`

Ajouter un produit au panier d'un utilisateur.

Exemple de corps :

```json
{
  "userId": "user-001",
  "productId": "{{productId}}",
  "quantity": 2
}
```

Tests Postman :

```javascript
pm.test("Le code de statut est 200", function () {
  pm.response.to.have.status(200);
});

pm.test("Le panier contient l'article ajoute", function () {
  const body = pm.response.json();
  const payload = JSON.parse(pm.request.body.raw);
  const item = body.items.find(function (entry) {
    return entry.productId === payload.productId;
  });

  pm.expect(body).to.have.property("userId", payload.userId);
  pm.expect(body.items).to.be.an("array");
  pm.expect(item).to.exist;
  pm.expect(item.quantity).to.eql(payload.quantity);
});
```

## PUT `/update`

Mettre a jour la quantite d'un article dans le panier.

Exemple de corps :

```json
{
  "userId": "user-001",
  "productId": "{{productId}}",
  "quantity": 4
}
```

Tests Postman :

```javascript
pm.test("Le code de statut est 200", function () {
  pm.response.to.have.status(200);
});

pm.test("La quantite de l'article du panier est mise a jour", function () {
  const body = pm.response.json();
  const payload = JSON.parse(pm.request.body.raw);
  const item = body.items.find(function (entry) {
    return entry.productId === payload.productId;
  });

  pm.expect(item).to.exist;
  pm.expect(item.quantity).to.eql(payload.quantity);
});
```

## DELETE `/remove`

Retirer un produit du panier.

Exemple de corps :

```json
{
  "userId": "user-001",
  "productId": "{{productId}}"
}
```

Tests Postman :

```javascript
pm.test("Le code de statut est 200", function () {
  pm.response.to.have.status(200);
});

pm.test("Le panier ne contient plus l'article supprime", function () {
  const body = pm.response.json();
  const payload = JSON.parse(pm.request.body.raw);
  const itemStillPresent = body.items.some(function (entry) {
    return entry.productId === payload.productId;
  });

  pm.expect(itemStillPresent).to.equal(false);
});
```

## GET `/:userId`

Recuperer le panier d'un utilisateur.

Tests Postman :

```javascript
pm.test("Le code de statut est 200", function () {
  pm.response.to.have.status(200);
});

pm.test("La reponse contient les totaux du panier", function () {
  const body = pm.response.json();

  pm.expect(body.items).to.be.an("array");
  pm.expect(body).to.have.property("total");
  pm.expect(body.total).to.be.a("number");
});
```
