const mongoose = require("mongoose");
const withdrawalSchema = require("../Schemas/withdrawalSchema");

const Withdraw = mongoose.model("Withdraw", withdrawalSchema);

module.exports = Withdraw;