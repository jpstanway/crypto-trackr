import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { GET_CRYPTO_METADATA } from "../graphql/queries";

const Crypto = props => {
  const currency = props.match.params.id;
  const { name, price } = props.location.state.crypto;
  const { data, loading } = useQuery(GET_CRYPTO_METADATA, {
    variables: { currency }
  });

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <p>{name}</p>
      <p>{price}</p>
      <p>
        <a
          href={data.getCryptoMetaData.website_url}
          rel="noopener noreferrer"
          target="_blank"
        >
          {data.getCryptoMetaData.website_url}
        </a>
      </p>
    </div>
  );
};

export default Crypto;
