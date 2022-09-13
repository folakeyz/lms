const express = require("express");
const {
  userRegistration,
  getUsers,
  googleAuth,
} = require("../controllers/admin");
const User = require("../models/User");
const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router.route("/").post(userRegistration).get(advancedResults(User), getUsers);
router.route("/google").post(googleAuth);

module.exports = router;
