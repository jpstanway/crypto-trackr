import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Loading from "../loading/Loading";
import TabbedContainer from "../tabbed-container/TabbedContainer";

import { organizeTrendData } from "./Crypto.utils";
import convertToCurrency from "../../utils/convertToCurrency";

import { GET_CRYPTO_METADATA } from "../../graphql/queries";

const Crypto = (props) => {
  const currency = props.match.params.id;
  const {
    name,
    price,
    logo_url,
    rank,
    market_cap,
    circulating_supply,
    daily,
    weekly,
    monthly,
    yearly,
    ytd,
  } = props.cryptos.cryptoData.find((crypto) => crypto.currency === currency);
  const { data, loading } = useQuery(GET_CRYPTO_METADATA, {
    variables: { currency },
  });

  const trends = organizeTrendData([daily, weekly, monthly, yearly, ytd]);

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="content">
      <div className="crypto-view-content">
        <div className="btn btn-back">
          <Link to="/">
            <i className="fas fa-arrow-left"></i> go back
          </Link>
        </div>
        <h1>
          {logo_url ? (
            <img src={logo_url} alt={name} style={{ maxWidth: "50px" }} />
          ) : (
            ""
          )}{" "}
          {name}
        </h1>
        <h3>
          <a
            href={data.getCryptoMetaData.website_url}
            rel="noopener noreferrer"
            target="_blank"
          >
            {data.getCryptoMetaData.website_url}
          </a>
        </h3>
        <ul style={{ listStyle: "none" }}>
          <li>
            <strong>Current Rank: </strong> {rank}
          </li>
          <li>
            <strong>Price: </strong> {convertToCurrency(price, true)}
          </li>
          <li>
            <strong>Market Cap: </strong> {convertToCurrency(market_cap, true)}
          </li>
          <li>
            <strong>Circulating Supply: </strong>{" "}
            {convertToCurrency(circulating_supply, false)}{" "}
            {currency.toUpperCase()}
          </li>
          <li>
            <strong>Community: </strong>{" "}
            {data.getCryptoMetaData.reddit_url ? (
              <a
                href={data.getCryptoMetaData.reddit_url}
                rel="noopener noreferrer"
                target="_blank"
              >
                {data.getCryptoMetaData.reddit_url}
              </a>
            ) : (
              <em>N/A</em>
            )}
          </li>
          <li>
            <strong>Whitepaper: </strong>{" "}
            {data.getCryptoMetaData.whitepaper_url ? (
              <a
                href={data.getCryptoMetaData.whitepaper_url}
                rel="noopener noreferrer"
                target="_blank"
              >
                {data.getCryptoMetaData.whitepaper_url}
              </a>
            ) : (
              <em>N/A</em>
            )}
          </li>
        </ul>
        <TabbedContainer trends={trends} />
      </div>
    </main>
  );
};

const mapStateToProps = (state) => ({
  cryptos: state.cryptos,
});

export default connect(mapStateToProps)(Crypto);
