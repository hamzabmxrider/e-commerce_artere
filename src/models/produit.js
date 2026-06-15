const { randomUUID } = require("crypto");

class Product {
  constructor(name, price, stockQuantity) {
    this.id = randomUUID();
    this.name = name;
    this.price = price;
    this.stockQuantity = stockQuantity;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.isActive = true;
  }
}

module.exports = Product;
