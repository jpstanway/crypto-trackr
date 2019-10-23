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
