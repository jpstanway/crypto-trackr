module.exports = function(portfolio, cryptoName) {
  const index = portfolio.map(crypto => crypto.name).indexOf(cryptoName);

  return index;
};
