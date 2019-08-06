const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLFloat } = graphql;
const UserType = require("./types/user_type");
const CryptoType = require("./types/crypto_type");
const auth = require("../services/auth");
const portfolio = require("../services/portfolio");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return auth.signup({ email, password, req });
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return auth.login({ email, password, req });
      }
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        const { user } = req;
        req.logout();
        return user;
      }
    },
    addCrypto: {
      type: CryptoType,
      args: {
        name: { type: GraphQLString },
        price: { type: GraphQLString },
        amount: { type: GraphQLFloat }
      },
      resolve(parentValue, { name, price, amount }, req) {
        return portfolio.addCrypto({ name, price, amount, req });
      }
    },
    updateCrypto: {
      type: CryptoType,
      args: {
        name: { type: GraphQLString },
        price: { type: GraphQLString },
        amount: { type: GraphQLFloat }
      },
      resolve(parentValue, { name, price, amount }, req) {
        return portfolio.updateCrypto({ name, price, amount, req });
      }
    },
    deleteCrypto: {
      type: CryptoType,
      args: {
        name: { type: GraphQLString }
      },
      resolve(parentValue, { name }, req) {
        return portfolio.deleteCrypto({ name, req });
      }
    }
  }
});

module.exports = mutation;
