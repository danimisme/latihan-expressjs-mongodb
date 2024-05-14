require("./utils/db");

const Product = require("./models/product");

const seedProducts = [
  {
    name: "Kemeja Flanel",
    brand: "Hollister",
    price: 750000,
    color: "biru muda",
    size: "M",
  },
  {
    name: "Celana Chino",
    brand: "Levi's",
    price: 900000,
    color: "krem",
    size: "L",
  },
  {
    name: "Sweater",
    brand: "Gap",
    price: 650000,
    color: "merah muda",
    size: "XL",
  },
  {
    name: "Tas Ransel",
    brand: "Herschel",
    price: 1500000,
    color: "biru",
    size: "S",
  },
  {
    name: "Kacamata Aviator",
    brand: "Ray-Ban",
    price: 2000000,
    color: "emas",
    size: "M",
  },
  {
    name: "Baju Renang",
    brand: "Speedo",
    price: 500000,
    color: "biru tua",
    size: "L",
  },
  {
    name: "Topi Baseball",
    brand: "New Era",
    price: 350000,
    color: "hitam",
    size: "XL",
  },
  {
    name: "Rompi",
    brand: "Zara",
    price: 850000,
    color: "abu-abu",
    size: "S",
  },
  {
    name: "Jas",
    brand: "Hugo Boss",
    price: 4500000,
    color: "hitam",
    size: "M",
  },
];

Product.insertMany(seedProducts)
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
