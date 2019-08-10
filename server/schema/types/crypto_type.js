const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLNonNull
} = graphql;

const CryptoType = new GraphQLObjectType({
  name: "CryptoType",
  fields: {
    currency: { type: new GraphQLNonNull(GraphQLString) },
    id: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLString) },
    price_date: { type: new GraphQLNonNull(GraphQLString) },
    symbol: { type: new GraphQLNonNull(GraphQLString) },
    circulating_supply: { type: new GraphQLNonNull(GraphQLString) },
    max_supply: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    logo_url: { type: new GraphQLNonNull(GraphQLString) },
    market_cap: { type: new GraphQLNonNull(GraphQLString) },
    rank: { type: new GraphQLNonNull(GraphQLString) },
    high: { type: new GraphQLNonNull(GraphQLString) },
    high_timestamp: { type: new GraphQLNonNull(GraphQLString) },
    amount: { type: GraphQLFloat }
  }
});

module.exports = CryptoType;
