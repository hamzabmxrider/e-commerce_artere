const categoryService = require("../services/categoryService");

exports.create = (req, res) => {
  try {
    const category = categoryService.create(req.body.name, req.body.description);
    res.json(category);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.addProduct = (req, res) => {
  try {
    categoryService.addProduct(req.params.id, req.body.productId);
    res.json({ message: "linked" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
