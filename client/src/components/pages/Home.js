import React, { Component } from "react";
import { graphql } from "react-apollo";
import query from "../../queries/GetTopTen";

class Home extends Component {
  renderTopTen() {
    const { loading, cryptos } = this.props.data;

    if (loading)
      return (
        <tr>
          <td colspan="5" className="home-table__loading">
            Loading...
          </td>
        </tr>
      );

    if (cryptos) {
      return cryptos.map(crypto => {
        return (
          <tr key={crypto.id} className="home-table__row">
            <td className="home-table__cell">{crypto.rank}</td>
            <td className="home-table__cell home-table__cell--name">
              <img
                src={crypto.logo_url}
                alt={crypto.name}
                className="home-table__logo"
              />
              {crypto.name}
            </td>
            <td className="home-table__cell">${crypto.market_cap}</td>
            <td className="home-table__cell">${crypto.price}</td>
            <td className="home-table__cell">${crypto.circulating_supply}</td>
          </tr>
        );
      });
    } else {
      return (
        <tr>
          <td>No data available</td>
        </tr>
      );
    }
  }

  render() {
    return (
      <div className="home-content">
        <h1 className="home-content__title heading-1">
          Current Top 10 Cryptocurrencies
        </h1>
        <div className="home-content__content">
          <table className="home-table">
            <thead className="home-table__head">
              <tr>
                <th className="home-table__heading home-table__heading--rank">
                  Rank
                </th>
                <th className="home-table__heading">Name</th>
                <th className="home-table__heading">Market Cap</th>
                <th className="home-table__heading">Price</th>
                <th className="home-table__heading">Volume</th>
              </tr>
            </thead>
            <tbody className="home-table__body">{this.renderTopTen()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default graphql(query)(Home);
