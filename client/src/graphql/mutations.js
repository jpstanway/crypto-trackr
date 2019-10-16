import { gql } from "apollo-boost";

export const ADD_NEW_CRYPTO = gql`
  mutation newCrypto($currency: String!, $name: String!) {
    addNewCrypto(currency: $currency, name: $name) {
      id
      currency
      name
      likes
    }
  }
`;

export const UPDATE_CRYPTO_LIKES = gql`
  mutation updateLikes($currency: String!) {
    updateCryptoLikes(currency: $currency)
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
