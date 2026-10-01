const userSchema = require("../Schemas/userSchema.js");
const mongoose = require("mongoose");

const User = mongoose.model("User", userSchema);

module.exports = User;