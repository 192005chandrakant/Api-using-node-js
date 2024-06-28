const Joi = require("joi");
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    minlength: 3, 
    maxlength: 30 
  },
  isEnrolled: { 
    type: Boolean, 
    default: false 
  },
  phone: { 
    type: String, 
    required: true, 
    minlength: 10, 
    maxlength: 25 
  }
});

const Student = mongoose.model("Student", studentSchema);

function validateStudent(student) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    phone: Joi.string().min(10).max(25).required(),
    isEnrolled: Joi.boolean()
  });
  return schema.validate(student);
}

exports.Student = Student;
exports.validateStudent = validateStudent;
