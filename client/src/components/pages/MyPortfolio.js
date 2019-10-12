import React, { Component } from "react";

class MyPortfolio extends Component {
  render() {
    return (
      <div className="portfolio-content">
        <h1 className="portfolio-content__ title heading-1">My Portfolio</h1>
        <div className="portfolio-content__content">
          <table className="portfolio-table">
            <thead className="portfolio-table__head">
              <tr>
                <th className="portfolio-table__heading">Coin</th>
                <th className="portfolio-table__heading">Amt Held</th>
                <th className="portfolio-table__heading">Current Price</th>
                <th className="portfolio-table__heading">Change (24h)</th>
                <th className="portfolio-table__heading">Remove</th>
              </tr>
            </thead>
            <tbody className="portfolio-table__body">
              <tr className="portfolio-table__row">
                <td className="portfolio-table__cell">Bitcoin</td>
                <td className="portfolio-table__cell">1.000000 BTC</td>
                <td className="portfolio-table__cell">$10,187.99</td>
                <td className="portfolio-table__cell">+2.23%</td>
                <td className="portfolio-table__cell">
                  <i className="fas fa-times fa-2x portfolio-table__remove" />
                </td>
              </tr>
              <tr className="portfolio-table__row">
                <td className="portfolio-table__cell">Cardano</td>
                <td className="portfolio-table__cell">1.000000 ADA</td>
                <td className="portfolio-table__cell">$0.059143</td>
                <td className="portfolio-table__cell">+2.64%</td>
                <td className="portfolio-table__cell">
                  <i className="fas fa-times fa-2x portfolio-table__remove" />
                </td>
              </tr>
            </tbody>
            <tfoot className="portfolio-table__foot">
              <tr>
                <td colSpan="4">Total Value</td>
                <td>$10,250.00 USD</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }
}

export default MyPortfolio;
