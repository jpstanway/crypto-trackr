const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList } = graphql;
const UserType = require("./user_type");
const CryptoType = require("./crypto_type");
const api = require("../../services/api");

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      type: UserType,
      resolve(parentValue, args, req) {
        return req.user;
      }
    },
    cryptos: {
      type: new GraphQLList(CryptoType),
      async resolve(parentValue, args, req) {
        const data = await api.getTopTen();
        return data;
      }
    }
  }
});

module.exports = RootQueryType;
