const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLNonNull
} = graphql;
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
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { email, password }, req) {
        return auth.signup({ email, password, req });
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
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
    changePassword: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        oldPassword: { type: new GraphQLNonNull(GraphQLString) },
        newPassword: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { email, oldPassword, newPassword }, req) {
        return auth.changePassword({ email, oldPassword, newPassword, req });
      }
    },
    deleteAccount: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { email }, req) {
        return auth.deleteAccount({ email, req });
      }
    },
    addCrypto: {
      type: CryptoType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLString) },
        amount: { type: new GraphQLNonNull(GraphQLFloat) }
      },
      resolve(parentValue, { name, price, amount }, req) {
        return portfolio.addCrypto({ name, price, amount, req });
      }
    },
    updateCrypto: {
      type: CryptoType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
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
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { name }, req) {
        return portfolio.deleteCrypto({ name, req });
      }
    }
  }
});

module.exports = mutation;
