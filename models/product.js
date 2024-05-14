const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    enum: ["XS", "S", "M", "L", "XL", "XXL"],
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
