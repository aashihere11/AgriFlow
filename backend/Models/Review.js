const mongoose = require("mongoose");
const reviewSchema = require("../Schemas/reviewSchema.js");

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;