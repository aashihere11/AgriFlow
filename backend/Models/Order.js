const mongoose = require("mongoose");
const orderSchema = require("../Schemas/orderSchema");


const Order = mongoose.model("Order", orderSchema);

module.exports = Order;