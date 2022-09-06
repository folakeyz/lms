const mongoose = require("mongoose");

const QuestionCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add Category"],
    unique: true,
  },
  instruction: {
    type: String,
  },
  time: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("QuestionCategory", QuestionCategorySchema);
