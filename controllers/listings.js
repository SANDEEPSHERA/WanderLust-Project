const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");
const axios = require('axios');

// Geocoding: convert location to coordinates
async function getCoordinates(location) {
  try {
    const response = await axios.get(`https://api.mapbox.com/geocode/v5/mapbox.places/${encodeURIComponent(location)}.json`, {
      params: {
        access_token: process.env.MAPBOX_API_KEY,
        limit: 1
      }
    });
    
    if (response.data.features && response.data.features.length > 0) {
      return response.data.features[0].center; // [longitude, latitude]
    }
    return [0, 0];
  } catch (error) {
    console.error('Geocoding error:', error.message);
    return [0, 0];
  }
}

// ================= INDEX =================
module.exports.index = async (req, res) => {
  try {
    let query = {};

    // Search
    if (req.query && req.query.search) {
      const searchTerm = String(req.query.search);
      query.$or = [
        { title: { $regex: searchTerm, $options: 'i' } },
        { location: { $regex: searchTerm, $options: 'i' } },
        { country: { $regex: searchTerm, $options: 'i' } }
      ];
    }

    // Filter by country
    if (req.query && req.query.country) {
      query.country = String(req.query.country);
    }

    // Price range filter
    if (req.query && req.query.priceRange) {
      const range = String(req.query.priceRange);
      if (range === '0-5000') {
        query.price = { $lte: 5000 };
      } else if (range === '5000-10000') {
        query.price = { $gte: 5000, $lte: 10000 };
      } else if (range === '10000+') {
        query.price = { $gt: 10000 };
      }
    }

    const allListings = await Listing.find(query).populate('owner');
    
    // Tax toggle for display
    const includeTaxes = req.query && req.query.includeTaxes === 'true';

    res.render("listings/index.ejs", { 
      allListings,
      search: req.query && req.query.search ? String(req.query.search) : '',
      country: req.query && req.query.country ? String(req.query.country) : '',
      priceRange: req.query && req.query.priceRange ? String(req.query.priceRange) : '',
      includeTaxes
    });
  } catch (err) {
    console.error("Index Error:", err);
    req.flash("error", "Failed to load listings");
    res.redirect("/");
  }
};

// ================= NEW FORM =================
module.exports.newForm = (req, res) => {
  res.render("listings/new");
};

// ================= CREATE =================
module.exports.create = async (req, res, next) => {
  let listingPayload = { ...req.body.listing };
  delete listingPayload.image;

  let newListing = new Listing(listingPayload);
  newListing.owner = req.user._id;
  
  // Geocode location
  if (newListing.location) {
    const coordinates = await getCoordinates(newListing.location);
    newListing.geometry = {
      type: 'Point',
      coordinates: coordinates
    };
  }
  
  if (req.file) {
    newListing.image = {
      url: req.file.path,
      filename: req.file.filename
    };
  }
  
  await newListing.save();
  req.flash("success", "New listing created!");
  res.redirect("/listings");
};

// ================= SHOW =================
module.exports.show = async (req, res) => {
  let listing = await Listing.findById(req.params.id).populate("owner").populate("reviews");
  res.render("listings/show", { listing });
};

// ================= EDIT FORM =================
module.exports.editForm = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("listings/edit", { listing });
};

// ================= UPDATE =================
module.exports.update = async (req, res) => {
  let { id } = req.params;
  let listingData = { ...req.body.listing };
  delete listingData.image;
  
  // Geocode updated location
  if (listingData.location) {
    const coordinates = await getCoordinates(listingData.location);
    listingData.geometry = {
      type: 'Point',
      coordinates: coordinates
    };
  }
  
  let listing = await Listing.findByIdAndUpdate(id, listingData);
  
  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename
    };
    await listing.save();
  }
  
  req.flash("success", "Listing updated!");
  res.redirect(`/listings/${id}`);
};

// ================= DELETE =================
module.exports.delete = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing deleted!");
  res.redirect("/listings");
};
