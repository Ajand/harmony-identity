const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/harmony-identity",
  (err, connect) => {
    if (err) return console.log(err);
    return "Connected to the harmony-identity";
  }
);
