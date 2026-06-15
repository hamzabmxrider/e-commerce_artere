const { v4: uuidv4 } = require("uuid");

class Product {
  constructor(name, price, stockQuantity) {
    this.id = uuidv4();
    this.name = name;
    this.price = price;
    this.stockQuantity = stockQuantity;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.isActive = true;
  }
}

module.exports = Product;
