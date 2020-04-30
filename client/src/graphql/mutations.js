import { gql } from "apollo-boost";

import { Trends } from "./fragments";

export const ADD_OR_UPDATE_CRYPTOS = gql`
  mutation addOrUpdateCrypto($cryptosToSave: [CryptoInput]!) {
    addCryptos(cryptosToSave: $cryptosToSave) {
      currency
      name
      rank
      price
      market_cap
      logo_url
      circulating_supply
      ...CryptoTrend
    }
  }
  ${Trends}
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
