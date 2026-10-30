const mongoose = require("mongoose");
const cartSchema = require("../Schemas/cartSchema");

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;