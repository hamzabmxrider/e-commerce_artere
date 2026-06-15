const db = require("../catalogue");
const Cart = require("../models/cart");

class CartService {

  getOrCreateCart(userId) {
    if (!db.carts.has(userId)) {
      db.carts.set(userId, new Cart(userId));
    }
    return db.carts.get(userId);
  }

  addProduct(userId, product, quantity) {
    if (quantity <= 0) throw new Error("Invalid quantity");

    const cart = this.getOrCreateCart(userId);
    cart.addItem(product, quantity);

    return cart;
  }

  updateProduct(userId, productId, quantity) {
    const cart = this.getOrCreateCart(userId);
    cart.updateItem(productId, quantity);
    return cart;
  }

  removeProduct(userId, productId) {
    const cart = this.getOrCreateCart(userId);
    cart.removeItem(productId);
    return cart;
  }

  getCart(userId) {
    return this.getOrCreateCart(userId);
  }

  getTotal(userId) {
    const cart = this.getOrCreateCart(userId);
    return cart.getTotal();
  }
}

module.exports = new CartService();
