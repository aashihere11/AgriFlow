const mongoose = require('mongoose');

const withdrawalSchema = new mongoose.Schema({
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  fee: {
    type: Number,
    default: 0
  },
  netReceivable: {
    type: Number,
    required: true
  },
  method: {
    type: String,
    enum: ['UPI', 'BANK'],
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'Completed' 
  }
}, { timestamps: true });

module.exports = withdrawalSchema;