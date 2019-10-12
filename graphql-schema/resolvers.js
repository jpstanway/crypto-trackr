const { UserInputError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const api = require("../services/api");
const User = require("../models/User");

module.exports = {
  Query: {
    allCryptos: async () => {
      return await api.getTopTen();
    },
    allUsers: () => {
      return User.find({});
    },
    me: (root, args, context) => {
      return context.currentUser;
    }
  },
  Mutation: {
    signup: async (root, args) => {
      const user = new User({
        email: args.email,
        password: args.password
      });

      try {
        return await User.save();
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ email: args.email });

      if (!user || !args.password) {
        throw new UserInputError("wrong credentials");
      }

      const userTokenData = {
        id: user._id,
        email: user.email
      };

      return { value: jwt.sign(userTokenData, process.env.JWT_SECRET) };
    }
  }
};
