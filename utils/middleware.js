const Listing = require("../models/listing");
const Review = require("../models/review");
const ExpressError = require("./ExpressError");

// LOGIN CHECK
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must login first!");
    return res.redirect("/users/login");
  }
  next();
};

// OWNER CHECK
module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;

  let listing = await Listing.findById(id);

  if (!listing.owner.equals(req.user._id)) {
    req.flash("error", "You are not the owner!");
    return res.redirect(`/listings/${id}`);
  }

  next();
};

// Review author check
module.exports.isReviewAuthor = async (req, res, next) => {
  let { reviewId, id } = req.params;

  let review = await Review.findById(reviewId);

  if (!review.author.equals(req.user._id)) {
    req.flash("error", "Not review author!");
    return res.redirect(`/listings/${id}`);
  }

  next();
};