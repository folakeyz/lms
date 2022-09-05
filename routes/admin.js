const express = require("express");
const { userRegistration, getUsers } = require("../controllers/admin");
const User = require("../models/User");
const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router.route("/").post(userRegistration).get(advancedResults(User), getUsers);

module.exports = router;
