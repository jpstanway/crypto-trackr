const mongoose = require("mongoose");

const User = mongoose.model("User");

function addCrypto({ name, price, amount, req }) {
  const crypto = { name, price, amount };

  if (!req.user)
    throw new Error("You must be logged in to perform this action");

  return User.findOne({ email: req.user.email })
    .then(user => {
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
    })
    .catch(err => console.log("Could not find user", err));
}

function updateCrypto({ name, price, amount, req }) {
  const crypto = { name };

  if (!req.user)
    throw new Error("You must be logged in to perform this action");

  // get users portfolio
  return User.findOne({ email: req.user.email })
    .then(user => {
      // iterate through portfolio to find correct crypto by name and retrive index
      const cryptoIndex = user.portfolio
        .map(portfolioCrypto => portfolioCrypto.name)
        .indexOf(crypto.name);

      if (cryptoIndex === -1)
        throw new Error("Cryptocurrency not found in portfolio");

      // update individual values if present
      if (price) user.portfolio[cryptoIndex].price = price;
      if (amount) user.portfolio[cryptoIndex].amount = amount;

      return user.save().then(({ portfolio }) => {
        return portfolio[cryptoIndex];
      });
    })
    .catch(err => console.log("Could not find user", err));
}

function deleteCrypto({ name, req }) {
  const crypto = { name };

  if (!req.user)
    throw new Error("You must be logged in to perform this action");

  return User.findOne({ email: req.user.email })
    .then(user => {
      // get index of crypto to be removed
      const cryptoIndex = user.portfolio
        .map(portfolioCrypto => portfolioCrypto.name)
        .indexOf(crypto.name);

      if (cryptoIndex === -1)
        throw new Error("Cryptocurrency not found in portfolio");

      // save crypto to be deleted so it can be returned later
      const deletedCrypto = user.portfolio[cryptoIndex];
      // splice out crypto from portfolio array
      user.portfolio.splice(cryptoIndex, 1);

      // save user's portfolio
      return user.save().then(() => {
        return deletedCrypto;
      });
    })
    .catch(err => console.log("Could not find user", err));
}

module.exports = { addCrypto, updateCrypto, deleteCrypto };

// mutation {
//   addCrypto(
//     name: "Bitcoin",
//     price: "$10,000.00",
//     amount: 2.55
//   ) {
//     id
//     name
//   }
// }
