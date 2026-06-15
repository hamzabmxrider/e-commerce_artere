const express = require("express");
const router = express.Router();
const controller = require("../controllers/category_controller");

router.post("/", controller.create);
router.post("/:id/products", controller.addProduct);

module.exports = router;
