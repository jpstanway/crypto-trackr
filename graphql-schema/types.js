const { gql } = require("apollo-server");

module.exports = gql`
  type Query {
    allCryptos: [Crypto!]!
    allUsers: [User!]!
    me: User
  }

  type Mutation {
    signup(email: String!, password: String!, password2: String!): Token!
    login(email: String, password: String!): Token!
    logout: User
    changePassword(
      email: String!
      oldPassword: String!
      newPassword: String!
      newPassword2: String!
    ): User!
    deleteAccount(email: String!): User
    addCrypto(name: String!, price: String!, amount: Float): Crypto!
    updateCrypto(name: String!, price: String!, amount: Float): Crypto!
    deleteCrypto(name: String!): Crypto
  }

  # type Subscription {
  # sub type here
  # }

  type Crypto {
    id: ID!
    currency: String!
    price: String!
    price_date: String!
    symbol: String!
    circulating_supply: String!
    max_supply: String!
    name: String!
    logo_url: String!
    market_cap: String!
    rank: String!
    high: String!
    high_timestamp: String!
    amount: Float
  }

  type User {
    id: ID!
    email: String!
    password: String!
    portfolio: [Crypto]
  }

  type Token {
    value: String!
  }
`;
