const mongoose = require("mongoose");

const SectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add Section Name"],
  },
  course: {
    type: mongoose.Schema.ObjectId,
    ref: "Course",
    required: true,
  },
  description: {
    type: String,
  },
  video: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Video",
    },
  ],

  // instruction: {
  //   type: String,
  // },
  // time: {
  //   type: String,
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Section", SectionSchema);
