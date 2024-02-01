const mongoose = require("mongoose");

const linkTransactionSchema = new mongoose.Schema({
  date: {
    type: String,
    default: new Date(),
  },
  from: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  linkId: {
    type: String,
  },
  type: {
    type: String,
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("linkTransaction", linkTransactionSchema);
