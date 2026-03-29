const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
require('dotenv').config();

// Session + flash
const session = require("express-session");
const flash = require("connect-flash");
const MongoStore = require('connect-mongo').default;

// Passport
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

// MODELS (optional)
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");

// ROUTES
const listingRoutes = require("./routes/listing.js");
const reviewRoutes = require("./routes/review.js");
const userRoutes = require("./routes/user.js");

// UTILS
const ExpressError = require("./utils/ExpressError");

// DB URL (Atlas only)
const MONGO_URL = process.env.MONGODB_URI;

if (!MONGO_URL) {
  throw new Error("MONGODB_URI is missing. Set your MongoDB Atlas URI in environment variables.");
}

// ================= DB CONNECT =================
main()
  .then(() => console.log("connected to DB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

// ================= VIEW ENGINE =================
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ================= MIDDLEWARE =================
app.use(express.static(path.join(__dirname, "public")));

// Static uploads path
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// ================= SESSION =================
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "mysupersecretkey",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
  // MongoDB session store
  store: new MongoStore({
    mongoUrl: MONGO_URL,
    touchAfter: 24 * 3600, // lazy session update (1 day)
  }),
};

app.use(session(sessionOptions));
app.use(flash());

// ================= PASSPORT =================
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ================= GLOBAL VARIABLES =================
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// ================= ROUTES =================

// ROOT
app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

// LISTINGS
app.use("/listings", listingRoutes);

// REVIEWS
app.use("/listings/:id/reviews", reviewRoutes);

// USERS
app.use("/users", userRoutes);

// LEGAL (footer links)
app.get("/privacy", (req, res) => {
  res.render("legal/privacy");
});

app.get("/terms", (req, res) => {
  res.render("legal/terms");
});

// ================= ERROR HANDLING =================

// 404
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

// FINAL ERROR HANDLER
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error", { message });
});

// ================= SERVER LISTEN =================
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server is listening to port ${PORT}`);
});
