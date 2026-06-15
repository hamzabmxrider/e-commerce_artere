const db = require("../database");
const Product = require("../models/Product");

class ProductService {

  create(name, price, stock) {
    if (!name || price <= 0 || stock < 0) {
      throw new Error("Invalid product data");
    }

    const product = new Product(name, price, stock);
    db.products.set(product.id, product);
    return product;
  }

  update(id, data) {
    const product = db.products.get(id);
    if (!product) throw new Error("Product not found");

    if (data.name) product.name = data.name;
    if (data.price != null) product.price = data.price;
    if (data.stockQuantity != null) product.stockQuantity = data.stockQuantity;

    product.updatedAt = new Date();
    return product;
  }

  delete(id) {
    db.products.delete(id);

    // clean references
    for (const category of db.categories.values()) {
      category.productIds = category.productIds.filter(p => p !== id);
    }
  }

  reserveStock(id, qty) {
    const product = db.products.get(id);
    if (!product) throw new Error("Product not found");
    if (product.stockQuantity < qty) throw new Error("Insufficient stock");

    product.stockQuantity -= qty;
    return product;
  }
}

module.exports = new ProductService();
