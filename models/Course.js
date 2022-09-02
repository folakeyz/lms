const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add Course Name"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Please add Description"],
  },
  specialization: {
    type: String,
  },
  author: {
    type: String,
  },
  thumbnail: {
    type: String,
    default: "thumbnail.jpg",
  },
  video: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Course", CourseSchema);
