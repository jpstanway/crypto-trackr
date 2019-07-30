const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID } = graphql;
const CryptoType = require("./crypto_type");

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    crypto: {
      type: CryptoType,
      resolve(parentValue, args, req) {
        console.log("Is it working?");
      }
    }
  }
});

module.exports = RootQueryType;
