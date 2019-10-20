import { gql } from "apollo-boost";

export const ALL_CRYPTOS = gql`
  query {
    allCryptos {
      id
      currency
      rank
      name
      logo_url
      market_cap
      price
      price_date
      circulating_supply
    }
  }
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

export const GET_CRYPTO_LIKES = gql`
  query {
    getCryptoLikes {
      id
      currency
      name
      likes
    }
  }
`;
