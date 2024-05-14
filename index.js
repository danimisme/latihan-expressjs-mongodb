const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
