const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
  },
  brand: {
    type: String,
    required: [true, "Product brand is required"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
  },
  color: {
    type: String,
    required: [true, "Product color is required"],
  },
  category: {
    type: String,
    enum: ["Baju", "Celana", "Aksesoris", "Jaket"],
    required: [true, "Product category is required"],
  },
  garment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Garment",
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
