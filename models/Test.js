const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Please add Course Name"],
  },
  course: {
    type: mongoose.Schema.ObjectId,
    ref: "Course",
    required: true,
  },
  section: {
    type: mongoose.Schema.ObjectId,
    ref: "Section",
    required: true,
  },
  options: [
    {
      type: String,
      required: [true, "Please add Options"],
    },
  ],
  correctAnswer: {
    type: String,
    required: [true, "Please add Correct Answer"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Test", TestSchema);
