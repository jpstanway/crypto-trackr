const { gql } = require("apollo-server-express");

module.exports = gql`
  type Query {
    allCryptos: [Crypto!]!
    getSingleCrypto(currency: String!): Crypto!
    getCryptoMetaData(currency: String!): Crypto!
    getCryptoData: [Crypto]
  }

  type Mutation {
    addCryptos(cryptosToSave: [CryptoInput]!): [Crypto]
    addLike(currency: String!, name: String!): Crypto
    removeCrypto(currency: String!): Crypto
  }

  type Trend {
    price_change: String
    price_change_pct: String
  }

  type Crypto {
    id: ID!
    currency: String!
    price: String
    price_date: String
    circulating_supply: String
    max_supply: String
    name: String
    logo_url: String
    market_cap: String
    rank: String
    high: String
    high_timestamp: String
    daily: Trend
    weekly: Trend
    monthly: Trend
    yearly: Trend
    ytd: Trend
    website_url: String
    reddit_url: String
    whitepaper_url: String
    likes: [String]
  }

  input TrendInput {
    price_change: String!
    price_change_pct: String!
  }

  input CryptoInput {
    currency: String!
    price: String!
    circulating_supply: String!
    name: String!
    logo_url: String
    market_cap: String!
    rank: String!
    daily: TrendInput
    weekly: TrendInput
    monthly: TrendInput
    yearly: TrendInput
    ytd: TrendInput
  }
`;
