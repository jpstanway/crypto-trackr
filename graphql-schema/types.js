const { gql } = require("apollo-server");

module.exports = gql`
  type Query {
    allCryptos: [Crypto!]!
    getOneCrypto(currency: String!): Crypto
    getCryptoMetaData(currency: String!): Crypto
    getCryptoLikes(currency: String!): Int
  }

  type Mutation {
    addNewCrypto(currency: String!, name: String!): Crypto
    updateCryptoLikes(currency: String!): Int
    removeCrypto(currency: String!): Crypto
  }

  type Crypto {
    id: ID!
    currency: String!
    price: String!
    price_date: String
    circulating_supply: String
    max_supply: String
    name: String
    logo_url: String
    market_cap: String
    rank: String!
    high: String
    high_timestamp: String
    website_url: String
    github_url: String
    reddit_url: String
    whitepaper_url: String
    likes: [String]
  }
`;
