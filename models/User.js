const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please add firstname"],
  },
  lastname: {
    type: String,
    required: [true, "Please add lastname"],
  },
  mobile: {
    type: String,
    maxlength: [11, "Phone Number cannot be more than 20 characters"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please add email"],
  },
  role: {
    type: String,
    required: true,
    enum: ["User", "Admin"],
    default: "User",
  },
  password: {
    type: String,
    minlength: 6,
    select: false,
  },
  assignedCourse: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Course",
    },
  ],
  assignedTest: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "ETest",
    },
  ],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
//Encrypt password using bcrypt
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//match user entered password to hashed password in db
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
//Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
//Generate and hash password token
UserSchema.methods.getResetPasswordToken = function () {
  //Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");
  //Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model("User", UserSchema);
