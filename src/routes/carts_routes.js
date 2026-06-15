const express = require("express");
const router = express.Router();
const controller = require("../controllers/cart_controller");

router.post("/add", controller.add);
router.put("/update", controller.update);
router.delete("/remove", controller.remove);
router.get("/:userId", controller.getCart);

module.exports = router;
