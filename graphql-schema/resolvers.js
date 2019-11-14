const { UserInputError } = require("apollo-server-express");
const axios = require("axios");

const Crypto = require("../models/Crypto");

module.exports = {
  Query: {
    allCryptos: async (root, args, context) => {
      const { url, key } = context.apiInfo;
      // query third party api for latest crypto updates
      const response = await axios.get(`${url}/currencies/ticker?key=${key}`);

      // filter the first 2k results
      return response.data.filter(crypto => crypto.rank <= 2000);
    },
    getSingleCrypto: async (root, args, context) => {
      const { url, key } = context.apiInfo;
      const currency = args.currency.toUpperCase();
      const response = await axios.get(
        `${url}/currencies/ticker?key=${key}&ids=${currency}`
      );

      if (!response) {
        throw new UserInputError("Crypto not found");
      }

      return response.data[0];
    },
    getCryptoMetaData: async (root, args, context) => {
      const { url, key } = context.apiInfo;
      const currency = args.currency.toUpperCase();
      const response = await axios.get(
        `${url}/currencies?key=${key}&ids=${currency}`
      );

      if (!response) {
        throw new UserInputError("Crypto not found");
      }

      return response.data[0];
    },
    getCryptoData: async (root, args) => {
      try {
        // get all saved crypto data from database
        return await Crypto.find();
      } catch (error) {
        throw new Error(error.message);
      }
    }
  },
  Mutation: {
    addCryptos: async (root, args) => {
      const { cryptosToSave } = args;
      try {
        for (let i = 0; i < cryptosToSave.length; i++) {
          const updateObject = { ...cryptosToSave[i] };

          // search database for crypto
          // if it already exists, update
          // if it does not exist, create new document
          const crypto = await Crypto.findOneAndUpdate(
            { currency: cryptosToSave[i].currency },
            updateObject,
            { new: true, upsert: true }
          );

          await crypto.save();
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
    addLike: async (root, args, context) => {
      try {
        const userIp = context.userIp();

        // search database for crypto
        let crypto = await Crypto.findOne({ currency: args.currency });

        // if it doesnt exist yet on the database, create new
        if (!crypto) {
          const cryptoObject = new Crypto({ ...args });
          crypto = await cryptoObject.save();
        }

        // update likes array in database (unless already liked by ip) and return new value
        if (crypto.likes.includes(userIp)) {
          throw new Error("You have already liked this cryptocurrency!");
        } else {
          // add ip to likes array and save
          crypto.likes = [...crypto.likes, userIp];
          await crypto.save();
        }

        return crypto;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    removeCrypto: async (root, args) => {
      try {
        // search database for crypto and remove
        return await Crypto.findOneAndRemove({ currency: args.currency });
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }
};
