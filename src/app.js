const express = require("express");
const app = express();

app.use(express.json());

app.use("/products", require("./routes/product_routes"));
app.use("/categories", require("./routes/categories_routes"));
app.use("/cart", require("./routes/carts_routes"));

if (require.main === module) {
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}

module.exports = app;
