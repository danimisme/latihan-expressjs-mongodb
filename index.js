const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const methodOverride = require("method-override");
const morgan = require("morgan");
require("./utils/db");
const ErrorHandler = require("./utils/errorHandler");

// Models
const Product = require("./models/product");
const Garment = require("./models/garment");

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

app.get("/garments", async (req, res) => {
  const garments = await Garment.find();
  res.render("garments", {
    title: "Garments",
    garments,
    layout: "layouts/main-layout",
  });
});

app.get("/garments/create", (req, res) => {
  res.render("garments/create", {
    title: "Create Garment",
    layout: "layouts/main-layout",
  });
});

app.post("/garments", async (req, res, next) => {
  const garment = new Garment(req.body);
  await garment
    .save()
    .then((result) => {
      res.redirect("/garments");
    })
    .catch((err) => {
      next(err);
    });
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

app.get("/products/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.render("products/show", {
      title: "Product Detail",
      product,
      layout: "layouts/main-layout",
    });
  } catch (error) {
    next({ status: 404, message: "Product Not Found" });
  }
});

app.get("/products/:id/edit", async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.render("products/edit", {
      title: "Edit Product",
      product,
      layout: "layouts/main-layout",
    });
  } catch (error) {
    next({ status: 404, message: "Cannot Edit , Product Not Found" });
  }
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

app.post("/products", async (req, res, next) => {
  const product = new Product(req.body);
  console.log(req.body);
  console.log(product);
  await product
    .save()
    .then((res) => {
      res.redirect("/products");
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        err.status = 400;
        err.message = Object.values(err.errors).map((e) => e.message);
      }
      next(err);
    });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    layout: "layouts/main-layout",
  });
});

app.use((req, res, next) => {
  next({ status: 404, message: "Page Not Found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Internal Server Error" } = err;
  res.status(status);
  res.render("error", {
    title: "Error",
    layout: "layouts/main-layout",
    message,
    status,
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
