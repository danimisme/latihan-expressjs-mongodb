const mongoose = require("mongoose");

const garmnmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nama tidak boleh kosong"],
  },
  location: {
    type: String,
  },
  contact: {
    type: String,
    required: [true, "Contact tidak boleh kosong"],
  },
  prodducts: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

const Garment = mongoose.model("Garment", garmnmentSchema);
module.exports = Garment;
