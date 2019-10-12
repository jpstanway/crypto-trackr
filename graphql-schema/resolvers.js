const { UserInputError } = require("apollo-server");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const api = require("../services/api");
const validation = require("../services/validation/validation");

module.exports = {
  Query: {
    allCryptos: async () => {
      return await api.getAll();
    },
    topTenCryptos: async () => {
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
      // validation
      const { errors, isValid } = validation.signupValidation({
        email,
        password,
        password2
      });

      if (!isValid) {
        throw new UserInputError(errors);
      }

      // new user object
      const user = new User({
        email: args.email,
        password: args.password
      });

      try {
        // save new user to database
        return await user.save();
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
