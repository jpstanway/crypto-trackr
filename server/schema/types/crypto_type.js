const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLID } = graphql;

const CryptoType = new GraphQLObjectType({
  name: "CryptoType",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    price: { type: GraphQLString },
    amount: { type: GraphQLFloat }
  }
});

module.exports = CryptoType;
