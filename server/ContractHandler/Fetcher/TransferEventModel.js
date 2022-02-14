const mongoose = require("mongoose");

var TransferSchema = new mongoose.Schema(
  {
    blockNumber: {
      type: Number,
      index: true,
    },
    transactionIndex: {
      type: Number,
      index: true,
    },
    address: {
      type: String,
      index: true,
      lowercase: true,
    },
    uniqueId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { strict: false }
);
var TransferEventModel = mongoose.model("transferEvent", TransferSchema);

module.exports = TransferEventModel;
