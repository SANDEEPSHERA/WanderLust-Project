const { listingSchema } = require("../schema.js");
const ExpressError = require("./ExpressError");

module.exports = (req, res, next) => {
  if (req.body && req.body.listing) {
    // Multer / browsers often send listing.image as a filename string; Joi expects an object
    const img = req.body.listing.image;
    if (typeof img === "string" || img === "") {
      delete req.body.listing.image;
    }
  }

  // Placeholder object so Joi passes when a new file is uploaded (actual url/filename set in controller)
  if (req.file && req.body && req.body.listing && req.body.listing.image === undefined) {
    req.body.listing.image = { url: "", filename: "" };
  }

  let { error } = listingSchema.validate(req.body);

  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};
