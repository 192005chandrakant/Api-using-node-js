const express = require("express");
const { Category, validateData } = require('C:\\Users\\Chandrakant\\project of Elearning platform like course era or scaler\\project\\models\\categoriesModel.js');
const router = express.Router();

router.get("/api/categories", async (req, res) => {
  try {
    let categories = await Category.find();
    res.send(categories);
  } catch (error) {
    res.status(500).send("An error occurred while fetching categories.");
  }
});

router.post("/api/categories", async (req, res) => {
  const { error } = validateData(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = new Category({
    name: req.body.name,
  });

  try {
    await category.save();
    res.send(category);
  } catch (error) {
    res.status(500).send("An error occurred while saving the category.");
  }
});

router.put("/api/categories/:id", async (req, res) => {
  const { error } = validateData(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );

    if (!category)
      return res
        .status(404)
        .send("The category with the given ID was not found.");

    res.send(category);
  } catch (error) {
    res.status(500).send("An error occurred while updating the category.");
  }
});

router.delete("/api/categories/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category)
      return res
        .status(404)
        .send("The category with the given ID was not found.");

    res.send(category);
  } catch (error) {
    res.status(500).send("An error occurred while deleting the category.");
  }
});

router.get("/api/categories/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res
        .status(404)
        .send("The category with the given ID was not found.");
    res.send(category);
  } catch (error) {
    res.status(500).send("An error occurred while fetching the category.");
  }
});

module.exports = router;
