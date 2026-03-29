const express = require("express");
const app = express();
const path = require("path");

const session = require("express-session");
const cookieParser = require("cookie-parser");

// ================= VIEW ENGINE =================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ================= MIDDLEWARE =================
app.use(cookieParser("supersecret"));

app.use(
  session({
    secret: "mysupersecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
    },
  })
);

// ================= ROUTES =================

// cookies routes
const cookieRoutes = require("./routes/cookies");
app.use("/cookies", cookieRoutes);

// HOME
app.get("/", (req, res) => {
  res.send("Classroom Project Running");
});

// RENDER PAGE
app.get("/page", (req, res) => {
  res.render("page", {
    user: req.session.username,
    count: req.session.count,
    cookies: req.cookies,
    signedCookies: req.signedCookies,
  });
});

// ================= SESSION ROUTES =================

// set session
app.get("/setsession", (req, res) => {
  req.session.username = "sandeep";
  res.redirect("/page");
});

// get session
app.get("/getsession", (req, res) => {
  res.send(req.session);
});

// visit count
app.get("/count", (req, res) => {
  if (req.session.count) {
    req.session.count++;
  } else {
    req.session.count = 1;
  }
  res.redirect("/page");
});

// logout
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.redirect("/page");
  });
});

// ================= SERVER =================
app.listen(3000, () => {
  console.log("Server running on port 3000");
});