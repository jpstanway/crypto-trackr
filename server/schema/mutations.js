const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString } = graphql;
const CryptoType = require("./types/crypto_type");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {}
});

module.exports = mutation;
