const express = require("express");
const router = express.Router();
const { Student, validateData } = require('C:\\Users\\Chandrakant\\project of Elearning platform like course era or scaler\\project\\models\\studentsModel.js');

// Middleware to parse JSON bodies
router.use(express.json());

router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.send(students);
  } catch (error) {
    res.status(500).send("An error occurred while fetching students.");
  }
});

router.post("/", async (req, res) => {
  const { error } = validateData(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const student = new Student({
      name: req.body.name,
      isEnrolled: req.body.isEnrolled,
      phone: req.body.phone,
    });

    await student.save();
    res.send(student);
  } catch (error) {
    res.status(500).send("An error occurred while saving the student.");
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validateData(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        isEnrolled: req.body.isEnrolled,
        phone: req.body.phone,
      },
      { new: true }
    );

    if (!student)
      return res.status(404).send("A student with the given ID was not found.");

    res.send(student);
  } catch (error) {
    res.status(500).send("An error occurred while updating the student.");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student)
      return res.status(404).send("A student with the given ID was not found.");

    res.send(student);
  } catch (error) {
    res.status(500).send("An error occurred while deleting the student.");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student)
      return res.status(404).send("A student with the given ID was not found.");

    res.send(student);
  } catch (error) {
    res.status(500).send("An error occurred while fetching the student.");
  }
});

module.exports = router;
