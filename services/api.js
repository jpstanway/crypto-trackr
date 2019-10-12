const axios = require("axios");
const { API_URL, API_KEY } = process.env;

const getAll = async () => {
  // query third party api for latest crypto updates
  const response = await axios.get(
    `${API_URL}/currencies/ticker?key=${API_KEY}`
  );

  return response.data;
};

const getTopTen = async () => {
  // query third party api for latest crypto updates
  const response = await axios.get(
    `${API_URL}/currencies/ticker?key=${API_KEY}`
  );

  // filter out top ten cryptos only
  return await response.data.filter(crypto => crypto.rank <= 10);
};

const getCrypto = async currency => {
  const response = await axios.get(
    `${API_URL}/currencies/ticker?key=${API_KEY}&ids=${currency.toUpperCase()}`
  );

  return response.data[0];
};

module.exports = { getAll, getTopTen, getCrypto };
