const express = require("express");
const router = express.Router();

const multer = require("multer");
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinary');

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wanderlust_listings',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 800, height: 600, crop: 'limit' }],
  },
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Accept only images
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

const listingController = require("../controllers/listings.js");

// MIDDLEWARES
const { isLoggedIn, isOwner } = require("../utils/middleware.js");
const validateListing = require("../utils/validateListing.js");

// ================= ROUTES =================

// Index + create
router
  .route("/")
  .get(listingController.index)
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    listingController.create
  );

// New form
router.get("/new", isLoggedIn, listingController.newForm);

// Show + update + delete
router
  .route("/:id")
  .get(listingController.show)
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    listingController.update
  )
  .delete(isLoggedIn, isOwner, listingController.delete);

// Edit form
router.get("/:id/edit", isLoggedIn, isOwner, listingController.editForm);

module.exports = router;