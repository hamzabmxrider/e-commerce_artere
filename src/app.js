const express = require("express");
const app = express();

app.use(express.json());

app.use("/products", require("./routes/product_routes"));
app.use("/categories", require("./routes/categories_routes"));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
