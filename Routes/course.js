const express = require("express");
const { Course, validateCourse } = require('C:\\Users\\Chandrakant\\project of Elearning platform like course era or scaler\\project\\models\\coursesModles.js');
const { Category } = require('../models/categoriesModel.js');
const router = express.Router();

// Middleware to parse JSON bodies
router.use(express.json());

router.get("/api/courses", async (req, res) => {
  try {
    let courses = await Course.find();
    res.send(courses);
  } catch (error) {
    res.status(500).send("An error occurred while fetching courses.");
  }
});

router.post("/api/courses", async (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const category = await Category.findById(req.body.categoryId);
    if (!category) return res.status(400).send('Invalid Category ID');

    let course = new Course({
      title: req.body.title,
      category: {
        _id: category._id,
        name: category.name,
      },
      creator: req.body.creator,
      rating: req.body.rating,
    });

    course = await course.save();
    res.send(course);
  } catch (error) {
    res.status(500).send("An error occurred while saving the course.");
  }
});

router.put("/api/courses/:id", async (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const category = await Category.findById(req.body.categoryId);
    if (!category) return res.status(400).send('Invalid Category ID');

    const course = await Course.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        category: {
          _id: category._id,
          name: category.name,
        },
        creator: req.body.creator,
        rating: req.body.rating,
      },
      { new: true }
    );

    if (!course)
      return res.status(404).send("The course with the given ID was not found.");

    res.send(course);
  } catch (error) {
    res.status(500).send("An error occurred while updating the course.");
  }
});

router.delete("/api/courses/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course)
      return res.status(404).send("The course with the given ID was not found.");

    res.send(course);
  } catch (error) {
    res.status(500).send("An error occurred while deleting the course.");
  }
});

router.get("/api/courses/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course)
      return res.status(404).send("The course with the given ID was not found.");
    res.send(course);
  } catch (error) {
    res.status(500).send("An error occurred while fetching the course.");
  }
});

module.exports = router;
