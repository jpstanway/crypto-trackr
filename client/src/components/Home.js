import React from "react";

const Home = () => (
  <main className="content">
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
          <tbody className="home-table__body">
            <tr className="home-table__row">
              <td className="home-table__cell">1</td>
              <td className="home-table__cell home-table__cell--name">
                <img
                  src="styles/imgs/Bitcoin_lightning_logo.png"
                  alt="Bitcoin"
                  className="home-table__logo"
                />
                Bitcoin
              </td>
              <td className="home-table__cell">$180,973,226,552</td>
              <td className="home-table__cell">$10,147.72</td>
              <td className="home-table__cell">$17,827,408,428</td>
            </tr>
            <tr className="home-table__row">
              <td className="home-table__cell">2</td>
              <td className="home-table__cell home-table__cell--name">
                <img
                  src="styles/imgs/1280px-Ethereum_logo_2014.svg.png"
                  alt="Ethereum"
                  className="home-table__logo"
                />
                Ethereum
              </td>
              <td className="home-table__cell">$23,215,477,041</td>
              <td className="home-table__cell">$216.92</td>
              <td className="home-table__cell">$7,156,530,506</td>
            </tr>
            <tr className="home-table__row">
              <td className="home-table__cell">3</td>
              <td className="home-table__cell home-table__cell--name">
                <img
                  src="styles/imgs/Xrp-symbol-black-128.png"
                  alt="XRP"
                  className="home-table__logo"
                />
                XRP
              </td>
              <td className="home-table__cell">$13,496,868,721</td>
              <td className="home-table__cell">$0.315107</td>
              <td className="home-table__cell">$1,058,438,679</td>
            </tr>
            <tr className="home-table__row">
              <td className="home-table__cell">4</td>
              <td className="home-table__cell home-table__cell--name">
                <img
                  src="styles/imgs/1920px-LTC-400.png"
                  alt="Litecoin"
                  className="home-table__logo"
                />
                Litecoin
              </td>
              <td className="home-table__cell">$5,846,135,332</td>
              <td className="home-table__cell">$93.10</td>
              <td className="home-table__cell">$2,722,809,484</td>
            </tr>
            <tr className="home-table__row">
              <td className="home-table__cell">5</td>
              <td className="home-table__cell home-table__cell--name">
                <img
                  src="styles/imgs/1076px-Bitcoin_Cash.png"
                  alt="Bitcoin Cash"
                  className="home-table__logo"
                />
                Bitcoin Cash
              </td>
              <td className="home-table__cell">$5,464,319,458</td>
              <td className="home-table__cell">$305.14</td>
              <td className="home-table__cell">$1,405,567,189</td>
            </tr>
            <tr className="home-table__row">
              <td className="home-table__cell">6</td>
              <td className="home-table__cell home-table__cell--name">
                Binance Coin
              </td>
              <td className="home-table__cell">$4,664,098,180</td>
              <td className="home-table__cell">$29.99</td>
              <td className="home-table__cell">$285,491,880</td>
            </tr>
            <tr className="home-table__row">
              <td className="home-table__cell">7</td>
              <td className="home-table__cell home-table__cell--name">
                Tether
              </td>
              <td className="home-table__cell">$4,024,559,911</td>
              <td className="home-table__cell">$1.00</td>
              <td className="home-table__cell">$18,940,955,009</td>
            </tr>
            <tr className="home-table__row">
              <td className="home-table__cell">8</td>
              <td className="home-table__cell home-table__cell--name">
                <img
                  src="styles/imgs/Eos_logo.png"
                  alt="EOS"
                  className="home-table__logo"
                />
                EOS
              </td>
              <td className="home-table__cell">$3,940,127,037</td>
              <td className="home-table__cell">$4.26</td>
              <td className="home-table__cell">$1,785,793,728</td>
            </tr>
            <tr className="home-table__row">
              <td className="home-table__cell">9</td>
              <td className="home-table__cell home-table__cell--name">
                <img
                  src="styles/imgs/Bsv-icon-small.png"
                  alt="Bitcoin SV"
                  className="home-table__logo"
                />
                Bitcoin SV
              </td>
              <td className="home-table__cell">$3,069,678,692</td>
              <td className="home-table__cell">$171.92</td>
              <td className="home-table__cell">$486,421,164</td>
            </tr>
            <tr className="home-table__row">
              <td className="home-table__cell">10</td>
              <td className="home-table__cell home-table__cell--name">TRON</td>
              <td className="home-table__cell">$1,687,400,042</td>
              <td className="home-table__cell">$0.025305</td>
              <td className="home-table__cell">$1,041,176,604</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
);

export default Home;
