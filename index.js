const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const expressLayout = require("express-ejs-layouts");
require("./utils/db");

// Models
const Product = require("./models/product");

app.use(expressLayout);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.set("layout", path.join(__dirname, "views/layouts"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", { title: "Home", layout: "layouts/main-layout" });
});

app.get("/products", async (req, res) => {
  const products = await Product.find();
  console.log(products);
  res.render("products", {
    title: "Products",
    products,
    layout: "layouts/main-layout",
  });
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  console.log(product);
  res.render("products/show", {
    title: "Product Detail",
    product,
    layout: "layouts/main-layout",
  });
});

app.get("/product/create", (req, res) => {
  res.render("products/create", {
    title: "Create Product",
    layout: "layouts/main-layout",
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
