const mongoose = require("mongoose");

const cryptoSchema = new mongoose.Schema({
  currency: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  likes: [String]
});

module.exports = mongoose.model("Crypto", cryptoSchema);
