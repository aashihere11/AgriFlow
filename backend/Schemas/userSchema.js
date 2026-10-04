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
  location: { type: String },

  // Farmer Specific Details (Optional)
  farmDetails: {
    farmSize: { type: String },       // e.g., "5 Acres"
    cropsGrown: [{ type: String }],   // e.g., ["Wheat", "Rice"]
    farmAddress: { type: String }
  },

  // Bank / Payout Details for Farmers (Optional)
  bankDetails: {
    accountHolderName: { type: String },
    accountNumber: { type: String },
    ifscCode: { type: String },
    bankName: { type: String },
    upiId: { type: String }           // Quick payouts ke liye
  }
}, { timestamps: true });


module.exports = userSchema;