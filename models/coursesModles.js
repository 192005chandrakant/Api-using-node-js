const Joi = require("joi");
const mongoose = require("mongoose");
const { categorySchema } = require("./categoriesModel.js");  // Adjusted the path if necessary

const Course = mongoose.model('Course', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
  category: {
    type: categorySchema,
    required: true,
  },
  creator: {
    type: String,
    required: true,
    minlength: 5,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
  },
}));

function validateCourse(course) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    categoryId: Joi.string().required(),
    creator: Joi.string().min(5).required(),
    rating: Joi.number().min(0).required(),
  });
  return schema.validate(course);
}

exports.Course = Course;
exports.validateCourse = validateCourse;
