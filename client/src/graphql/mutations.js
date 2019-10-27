import { gql } from "apollo-boost";

export const ADD_OR_UPDATE_CRYPTO = gql`
  mutation addOrUpdateCrypto(
    $currency: String!
    $name: String!
    $rank: String!
    $market_cap: String!
    $price: String!
    $circulating_supply: String!
  ) {
    addCrypto(
      currency: $currency
      name: $name
      rank: $rank
      market_cap: $market_cap
      price: $price
      circulating_supply: $circulating_supply
    ) {
      id
      currency
      name
      rank
      market_cap
      price
      circulating_supply
      likes
    }
  }
`;

export const ADD_LIKE = gql`
  mutation addLikeToCrypto($currency: String!, $name: String!) {
    addLike(currency: $currency, name: $name) {
      currency
      likes
    }
  }
`;

export const REMOVE_CRYPTO = gql`
  mutation removeCrypto($currency: String!) {
    removeCrypto(currency: $currency) {
      id
      currency
      name
    }
  }
`;
