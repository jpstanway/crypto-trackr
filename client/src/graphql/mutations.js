import { gql } from "apollo-boost";

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
      daily {
        price_change
        price_change_pct
      }
      weekly {
        price_change
        price_change_pct
      }
      monthly {
        price_change
        price_change_pct
      }
      yearly {
        price_change
        price_change_pct
      }
      ytd {
        price_change
        price_change_pct
      }
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
