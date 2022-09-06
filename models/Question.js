const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Please add Question"],
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "QuestionCategory",
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
    default: "nil",
  },
  multiple: {
    type: Boolean,
    required: true,
    default: false,
  },
  answers: [
    {
      type: String,
      required: [true, "Please add Options"],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Question", QuestionSchema);
