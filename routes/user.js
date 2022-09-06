const express = require("express");
const {
  createUser,
  login,
  getMe,
  getUsers,
  forgotPassword,
  resetPassword,
  updateUser,
  deleteUser,
  AssignCourse,
  AssignTest,
} = require("../controllers/user");
const User = require("../models/User");
const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router.route("/").post(createUser).get(advancedResults(User), getUsers);
router.route("/login").post(login);
router.route("/me").get(protect, getMe);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword").post(resetPassword);
router
  .route("/:id")
  .put(protect, authorize("Admin"), updateUser)
  .delete(protect, authorize("Admin"), deleteUser);
router.route("/assign/:id").put(AssignCourse);
router.route("/assigntest/:id").put(AssignTest);

module.exports = router;
