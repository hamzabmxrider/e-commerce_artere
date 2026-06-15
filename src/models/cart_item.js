class CartItem {
  constructor(productId, quantity, unitPrice) {
    this.productId = productId;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
  }

  getTotal() {
    return this.quantity * this.unitPrice;
  }
}

module.exports = CartItem;
