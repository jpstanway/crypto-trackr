import { gql } from "apollo-boost";

import { Data, Trends } from "./fragments";

export const ALL_CRYPTOS = gql`
  query {
    allCryptos {
      ...CryptoData
      ...CryptoTrend
    }
  }
  ${Data}
  ${Trends}
`;

export const GET_CRYPTO_METADATA = gql`
  query cryptoMetadata($currency: String!) {
    getCryptoMetaData(currency: $currency) {
      website_url
      reddit_url
      whitepaper_url
    }
  }
`;

export const GET_SAVED_CRYPTO_DATA = gql`
  query {
    getCryptoDataFromDb {
      ...CryptoData
      ...CryptoTrend
      likes
    }
  }
  ${Data}
  ${Trends}
`;
