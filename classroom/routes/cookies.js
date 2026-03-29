const express = require("express");
const router = express.Router();

// set normal cookie
router.get("/set", (req, res) => {
  res.cookie("username", "sandeep");
  res.redirect("/page");
});

// get normal cookie
router.get("/get", (req, res) => {
  res.send(req.cookies);
});

// set signed cookie
router.get("/setsigned", (req, res) => {
  res.cookie("user", "sandeep", { signed: true });
  res.redirect("/page");
});

// get signed cookie
router.get("/getsigned", (req, res) => {
  res.send(req.signedCookies);
});

// cookie with options
router.get("/setoptions", (req, res) => {
  res.cookie("token", "abc123", {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
  });
  res.redirect("/page");
});

// delete cookie
router.get("/delete", (req, res) => {
  res.clearCookie("username");
  res.redirect("/page");
});

module.exports = router;