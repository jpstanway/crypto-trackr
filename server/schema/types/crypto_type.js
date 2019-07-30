const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;

const CryptoType = new GraphQLObjectType({
  name: "CryptoType",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    rank: { type: GraphQLInt },
    price: { type: GraphQLString },
    marketValue: { type: GraphQLString },
    volume: { type: GraphQLString }
  }
});

module.exports = CryptoType;
