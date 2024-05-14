const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/shop_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });
