const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID } = graphql;
const CryptoType = require("./crypto_type");

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    crypto: {
      type: CryptoType,
      resolve(parentValue, args, req) {
        return req.body;
      }
    }
  }
});

module.exports = RootQueryType;
