const express = require("express");
const router = express.Router({ mergeParams: true });

const Listing = require("../models/listing");
const reviewController = require("../controllers/review");

// MIDDLEWARES
const { isLoggedIn, isReviewAuthor } = require("../utils/middleware.js");
const validateReview = require("../utils/validateReview.js");

// ================= ROUTES =================

// CREATE REVIEW
router.post(
  "/",
  isLoggedIn,
  validateReview,
  reviewController.createReview
);

// DELETE REVIEW
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  reviewController.deleteReview
);

module.exports = router;