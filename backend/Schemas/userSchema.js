const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // Common Fields (Basic Auth)
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['farmer', 'consumer'],
    default: 'consumer'
  },
  phone: { type: String },
  location: { type: String},


  isProfileComplete: { type: Boolean, default: false },
  hasSeenWelcomeModal: { type: Boolean, default: false },

  // Bank details are completed later from the farmer profile. Keep the fields
  // present on every new user instead of leaving them undefined.
  bankName: { type: String, default: "" },
  accountNumber: { type: String, default: "" },
  ifscCode: { type: String, default: "" },
  upiId: { type: String, default: "" },

}, { timestamps: true });


module.exports = userSchema;
