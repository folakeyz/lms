const mongoose = require("mongoose");

const TrainingSchema = new mongoose.Schema({
  firstname: {
    type: String,
  },
  middlename: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
  },
  video: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Training", TrainingSchema);
