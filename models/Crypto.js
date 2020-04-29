const mongoose = require("mongoose");

const cryptoSchema = new mongoose.Schema({
  currency: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  likes: [String],
  rank: String,
  market_cap: String,
  logo_url: String,
  price: String,
  circulating_supply: String,
  daily: {
    price_change: String,
    price_change_pct: String,
  },
  weekly: {
    price_change: String,
    price_change_pct: String,
  },
  monthly: {
    price_change: String,
    price_change_pct: String,
  },
  yearly: {
    price_change: String,
    price_change_pct: String,
  },
  ytd: {
    price_change: String,
    price_change_pct: String,
  },
});

module.exports = mongoose.model("Crypto", cryptoSchema);
