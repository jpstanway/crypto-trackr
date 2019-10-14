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

      return response.data;
    },
    getCryptoMetaData: async (root, args) => {
      const currencyId = args.currencyId.toUpperCase();
      const response = await axios.get(
        `${API_URL}/currencies?key=${API_KEY}&ids=${currencyId}`
      );

      if (!response) {
        throw new UserInputError("Crypto not found");
      }

      return response.data[0];
    },
    getCryptoLikes: async (root, args) => {
      try {
        // get crypto from database
        const crypto = await Crypto.find({ currency: args.currency });

        // return length of likes array
        return crypto[0].likes.length;
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
        const crypto = await Crypto.find({ currency: args.currency });

        if (crypto[0].likes.includes(userIp)) {
          throw new Error("You have already liked this cryptocurrency");
        } else {
          crypto[0].likes = [...crypto[0].likes, userIp];
          await crypto[0].save();
        }

        return crypto[0].likes.length;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }
};
