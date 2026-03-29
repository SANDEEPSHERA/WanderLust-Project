const express = require("express");
const router = express.Router();

const passport = require("passport");
const userController = require("../controllers/user");
const { isLoggedIn } = require("../utils/middleware.js");

// ================= ROUTES =================

// Signup (form + create)
router
  .route("/signup")
  .get(userController.signupForm)
  .post(userController.signup);

// Login (form + auth)
router
  .route("/login")
  .get(userController.loginForm)
  .post(
    passport.authenticate("local", {
      failureRedirect: "/users/login",
      failureFlash: true,
    }),
    userController.login
  );

// Logout
router.get("/logout", userController.logout);

module.exports = router;