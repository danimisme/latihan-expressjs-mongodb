const express = require("express");
const router = express.Router();

const Garment = require("../models/garment");

router.get("/", async (req, res) => {
  const garments = await Garment.find();
  res.render("garments", {
    title: "Garments",
    garments,
    layout: "layouts/main-layout",
  });
});

router.get("/create", (req, res) => {
  res.render("garments/create", {
    title: "Create Garment",
    layout: "layouts/main-layout",
  });
});

router.post("/", async (req, res, next) => {
  const garment = new Garment(req.body);
  await garment
    .save()
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const garment = await Garment.findById(id).populate("products");
    console.log(garment);
    res.render("garments/show", {
      title: "Garment Detail",
      garment,
      layout: "layouts/main-layout",
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Garment.findOneAndDelete({ _id: id })
    .then(() => {
      console.log("Garment has been deleted");
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
