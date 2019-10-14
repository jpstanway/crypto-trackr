const { gql } = require("apollo-server");

module.exports = gql`
  type Query {
    allCryptos: [Crypto!]!
    getCryptoMetaData(currencyId: String!): Crypto
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
    price_date: String!
    symbol: String!
    circulating_supply: String!
    max_supply: String!
    name: String
    logo_url: String
    market_cap: String!
    rank: String!
    high: String!
    high_timestamp: String!
    website_url: String
    blog_url: String
    discord_url: String
    facebook_url: String
    github_url: String
    medium_url: String
    reddit_url: String
    telegram_url: String
    twitter_url: String
    whitepaper_url: String
    youtube_url: String
    likes: [String]
  }
`;
