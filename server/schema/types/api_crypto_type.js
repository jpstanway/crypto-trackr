const graphql = require("graphql");
const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = graphql;

const ApiCryptoType = new GraphQLObjectType({
  name: "ApiCryptoType",
  fields: {
    currency: { type: new GraphQLNonNull(GraphQLString) },
    id: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLString) },
    price_date: { type: new GraphQLNonNull(GraphQLString) },
    symbol: { type: new GraphQLNonNull(GraphQLString) },
    circulating_supply: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    logo_url: { type: new GraphQLNonNull(GraphQLString) },
    market_cap: { type: new GraphQLNonNull(GraphQLString) },
    rank: { type: new GraphQLNonNull(GraphQLString) },
    high: { type: new GraphQLNonNull(GraphQLString) },
    high
  }
});
