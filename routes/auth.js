const express = require("express");
const router = express.Router();
const {
  register,
  resetPassword,
  login,
  forgotPassword,
} = require("../controllers/auth");

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/resetpassword/:resetToken").post(resetPassword);

router.route("/forgotpassword").post(forgotPassword);

module.exports = router;
