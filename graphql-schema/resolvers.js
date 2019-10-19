const { UserInputError } = require("apollo-server");
const axios = require("axios");
const { API_URL, API_KEY } = process.env;

const Crypto = require("../models/Crypto");

module.exports = {
  Query: {
    allCryptos: async () => {
      // query third party api for latest crypto updates
      const response = await axios.get(
        `${API_URL}/currencies/ticker?key=${API_KEY}`
      );

      // filter out top 100 cryptos
      return response.data.filter(crypto => crypto.rank <= 100);
    },
    getCryptoMetaData: async (root, args) => {
      const currency = args.currency.toUpperCase();
      const response = await axios.get(
        `${API_URL}/currencies?key=${API_KEY}&ids=${currency}`
      );

      if (!response) {
        throw new UserInputError("Crypto not found");
      }

      return response.data[0];
    },
    getCryptoLikes: async (root, args) => {
      try {
        // get crypto from database
        const crypto = await Crypto.findOne({ currency: args.currency });

        // return length of likes array
        return crypto.likes.length;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  },
  Mutation: {
    addNewCrypto: async (root, args) => {
      const cryptoObject = new Crypto({ ...args });

      try {
        return await cryptoObject.save();
      } catch (error) {
        throw new Error(error.message);
      }
    },
    updateCryptoLikes: async (root, args, context) => {
      try {
        const userIp = "testIp";
        const crypto = await Crypto.findOne({ currency: args.currency });

        if (crypto.likes.includes(userIp)) {
          throw new Error("You have already liked this cryptocurrency");
        } else {
          crypto.likes = [...crypto.likes, userIp];
          await crypto.save();
        }

        return crypto.likes.length;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    removeCrypto: async (root, args) => {
      try {
        return await Crypto.findOneAndRemove({ currency: args.currency });
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }
};
