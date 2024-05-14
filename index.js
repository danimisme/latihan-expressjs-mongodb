const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const methodOverride = require("method-override");
const morgan = require("morgan");
require("./utils/db");

// Models
const Product = require("./models/product");

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use(expressLayout);

app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.set("layout", path.join(__dirname, "views/layouts"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.redirect("/products");
});

app.get("/products", async (req, res) => {
  const { category } = req.query;
  if (category) {
    const products = await Product.find({ category });
    res.render("products", {
      title: "Products",
      products,
      category,
      layout: "layouts/main-layout",
    });
  } else {
    const products = await Product.find();
    res.render("products", {
      title: "Products",
      products,
      category: "",
      layout: "layouts/main-layout",
    });
  }
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/show", {
    title: "Product Detail",
    product,
    layout: "layouts/main-layout",
  });
});

app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/edit", {
    title: "Product Detail",
    product,
    layout: "layouts/main-layout",
  });
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndUpdate(id, req.body, { runValidators: true });
  res.redirect("/products/" + id);
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id)
    .then(() => {
      console.log("Product has been deleted");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/products");
});

app.get("/product/create", (req, res) => {
  res.render("products/create", {
    title: "Create Product",
    layout: "layouts/main-layout",
  });
});

app.post("/products", async (req, res) => {
  const product = new Product(req.body);
  console.log(req.body);
  console.log(product);
  await product.save();
  res.redirect("/products");
});

app.use((req, res) => {
  res.status(404);
  res.render("not-found", {
    title: "Not Found",
    layout: "layouts/main-layout",
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
