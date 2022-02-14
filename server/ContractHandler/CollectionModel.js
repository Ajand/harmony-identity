const mongoose = require("mongoose");

var CollectionSchema = new mongoose.Schema(
  {
    fetchedTill: {
      type: Number,
      index: true,
    },
    updatedTill: {
      type: Number,
      index: true,
    },
    mainAddress: {
      type: String,
      index: true,
      lowercase: true,
      required: true,
    },
    mappingAddress: {
      type: String,
      index: true,
      lowercase: true,
    },
  },
  { strict: false }
);
var Collection = mongoose.model("collection", CollectionSchema);

module.exports = Collection;
