const express = require("express");
const mongoose = require("mongoose");
const categories = require("C:\\Users\\Chandrakant\\project of Elearning platform like course era or scaler\\project\\Routes\\catogries.js"); // Check this path
const students = require("C:\\Users\\Chandrakant\\project of Elearning platform like course era or scaler\\project\\Routes\\student.js");
const courses = require("C:\\Users\\Chandrakant\\project of Elearning platform like course era or scaler\\project\\Routes\\course.js");
const app = express();

mongoose
  .connect("mongodb://localhost/learningPlatform", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connection is successful to Database");
  })
  .catch((error) => {
    console.error("Couldn't connect to MongoDB", error);
  });

// Middleware to parse JSON bodies
app.use(express.json());
app.use("/api/categories", categories);
app.use("/api/students", students);
app.use("/api/courses", courses);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`));
