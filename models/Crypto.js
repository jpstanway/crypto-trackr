const mongoose = require("mongoose");

const cryptoSchema = mongoose.Schema({
  currency: { type: String, required: true },
  price: { type: String, required: true },
  price_date: String,
  symbol: { type: String, required: true },
  circulating_supply: String,
  max_supply: String,
  name: { type: String, required: true },
  logo_url: String,
  market_cap: String,
  rank: { type: String, required: true },
  high: String,
  high_timestamp: String,
  amount: { type: Number, required: true }
});

module.exports = mongoose.model("Crypto", cryptoSchema);
