const productService = require("../services/produit_service");

exports.create = (req, res) => {
  try {
    const product = productService.create(
      req.body.name,
      req.body.price,
      req.body.stockQuantity
    );
    res.json(product);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.update = (req, res) => {
  try {
    const product = productService.update(req.params.id, req.body);
    res.json(product);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.delete = (req, res) => {
  productService.delete(req.params.id);
  res.json({ message: "deleted" });
};
