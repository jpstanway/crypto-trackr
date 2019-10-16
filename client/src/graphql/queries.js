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
      circulating_supply
    }
  }
`;

export const GET_CRYPTO_METADATA = gql`
  query cryptoMetadata($currency: String!) {
    getCryptoMetaData(currency: $currency) {
      website_url
      blog_url
      discord_url
      facebook_url
      github_url
      medium_url
      reddit_url
      telegram_url
      twitter_url
      whitepaper_url
      youtube_url
    }
  }
`;

export const GET_CRYPTO_LIKES = gql`
  query cryptoLikes($currency: String!) {
    getCryptoLikes(currency: $currency)
  }
`;
