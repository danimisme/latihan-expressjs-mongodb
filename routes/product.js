const express = require("express");
const routes = express.Router();

const Product = require("../models/product");
const Garment = require("../models/garment");

routes.get("/", async (req, res) => {
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

routes.get("/:id", async (req, res, next) => {
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

routes.get("/:id/edit", async (req, res, next) => {
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

routes.put("/:id", async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndUpdate(id, req.body, { runValidators: true });
  res.redirect("/" + id);
});

routes.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id)
    .then(() => {
      console.log("Product has been deleted");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/");
});

routes.get("/create/:garment_id", async (req, res) => {
  const garments = await Garment.find();
  const { garment_id } = req.params;
  res.render("products/create", {
    title: "Create Product",
    layout: "layouts/main-layout",
    garments,
    garment_id,
  });
});

routes.post("/", async (req, res, next) => {
  const product = new Product(req.body);
  try {
    const garment = await Garment.findById(product.garment);
    product.garment = garment;
    garment.products.push(product);
    await garment.save();
    await product.save();
    res.redirect("/");
  } catch (error) {
    if (err.name === "ValidationError") {
      err.status = 400;
      err.message = Object.values(err.errors).map((e) => e.message);
    }
    next(err);
  }
});

module.exports = routes;
