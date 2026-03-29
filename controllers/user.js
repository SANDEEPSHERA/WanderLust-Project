const User = require("../models/user");
const Listing = require("../models/listing");
const Review = require("../models/review");
const passport = require("passport");

// SIGNUP FORM
module.exports.signupForm = (req, res) => {
  res.render("users/signup");
};

// SIGNUP
module.exports.signup = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;

    const newUser = new User({ email, username });

    const registeredUser = await User.register(newUser, password);

    // auto login after signup
    req.login(registeredUser, (err) => {
      if (err) return next(err);

      req.flash("success", "Welcome to WanderLust!");

      // REDIRECT FIX
      let redirectUrl = req.session.redirectUrl || "/listings";
      delete req.session.redirectUrl;

      res.redirect(redirectUrl);
    });

  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/users/signup");
  }
};

// LOGIN FORM
module.exports.loginForm = (req, res) => {
  res.render("users/login");
};

// LOGIN
module.exports.login = (req, res) => {
  req.flash("success", "Welcome back!");

  // REDIRECT FIX
  let redirectUrl = req.session.redirectUrl || "/listings";
  delete req.session.redirectUrl;

  res.redirect(redirectUrl);
};

// LOGOUT
module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    req.flash("success", "Logged out successfully!");
    res.redirect("/listings");
  });
};
