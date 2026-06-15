const CartItem = require("./cart_item");

class Cart {
  constructor(userId) {
    this.userId = userId;
    this.items = []; // CartItem[]
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  addItem(product, quantity) {
    const existing = this.items.find(i => i.productId === product.id);

    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push(
        new CartItem(product.id, quantity, product.price)
      );
    }

    this.updatedAt = new Date();
  }

  updateItem(productId, quantity) {
    const item = this.items.find(i => i.productId === productId);
    if (!item) throw new Error("Item not found");

    item.quantity = quantity;
    this.updatedAt = new Date();
  }

  removeItem(productId) {
    this.items = this.items.filter(i => i.productId !== productId);
    this.updatedAt = new Date();
  }

  clear() {
    this.items = [];
    this.updatedAt = new Date();
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + item.getTotal(), 0);
  }
}

module.exports = Cart;
