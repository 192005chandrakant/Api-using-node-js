const Joi = require("joi");
const mongoose = require("mongoose");

// Define the category schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
});

// Create the Category model
const Category = mongoose.model("Category", categorySchema);

// Define the validation function for category data
function validateCategory(category) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
  });
  return schema.validate(category);
}

// Export the category schema, model, and validation function
exports.categorySchema = categorySchema;
exports.Category = Category;
exports.validateCategory = validateCategory;



