const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add Test Name"],
  },
  categories: [
    {
      category: {
        type: mongoose.Schema.ObjectId,
        ref: "QuestionCategory",
        required: true,
      },
      count: { type: Number },
    },
  ],
  random: {
    type: Boolean,
    required: true,
    default: true,
  },
  maxQuestion: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Test", TestSchema);
