// src/controllers/cartController.js
const cartService = require("../services/cart_service");
const db = require("../catalogue");

exports.add = (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const product = db.products.get(productId);
    if (!product) throw new Error("Product not found");

    const cart = cartService.addProduct(userId, product, quantity);
    res.json(cart);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.update = (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const cart = cartService.updateProduct(userId, productId, quantity);
    res.json(cart);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.remove = (req, res) => {
  try {
    const { userId, productId } = req.body;
    const cart = cartService.removeProduct(userId, productId);
    res.json(cart);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.getCart = (req, res) => {
  const cart = cartService.getCart(req.params.userId);

  res.json({
    items: cart.items,
    total: cart.getTotal()
  });
};
