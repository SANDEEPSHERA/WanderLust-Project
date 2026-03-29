const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },

  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },

  // REVIEW AUTHOR
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Review", reviewSchema);