const axios = require("axios");

const getAll = async () => {
  const { API_URL, API_KEY } = process.env;

  // query third party api for latest crypt updates
  const response = await axios.get(
    `${API_URL}/currencies/ticker?key=${API_KEY}`
  );
  console.log(response);
  return response.data;
};

const getTopTen = async () => {
  const { API_URL, API_KEY } = process.env;

  // query third party api for latest crypt updates
  const response = await axios.get(
    `${API_URL}/currencies/ticker?key=${API_KEY}`
  );

  // filter out top ten cryptos only
  return await response.data.filter(crypto => crypto.rank <= 10);
};

module.exports = { getAll, getTopTen };
