const mongoose = require("mongoose");

const User = mongoose.model("User");

function addCrypto({ name, price, amount, req }) {
  const crypto = { name, price, amount };

  if (!req.user) throw new Error("You must be logged in");

  return User.findOne({ email: req.user.email }).then(user => {
    if (!user) throw new Error("Could not find user");

    // check if user already has that crypto
    const cryptoExists = user.portfolio.find(
      portfolioCrypto => crypto.name === portfolioCrypto.name
    );
    if (cryptoExists) {
      throw new Error("Crypto already added to portfolio");
    }

    // add crypto to portfolio
    user.portfolio.push(crypto);

    // save and return latest addition
    return user.save().then(({ portfolio }) => {
      return portfolio[portfolio.length - 1];
    });
  });
}

module.exports = { addCrypto };
