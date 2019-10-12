const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true, minlength: 6 },
  portfolio: [
    {
      name: { type: String, required: true },
      price: { type: String, required: true },
      amount: { type: Number, required: true }
    }
  ],
  dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
