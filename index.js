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

app.use("/garments", require("./routes/garment"));
app.use("/products", require("./routes/product"));

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
