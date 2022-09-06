const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add Video Name"],
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
  description: {
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

module.exports = mongoose.model("Video", VideoSchema);
