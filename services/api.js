const axios = require("axios");

const getTopTen = async () => {
  const { API_URL, API_KEY } = process.env;

  // query third party api for latest crypt updates
  const response = await axios.get(
    `${API_URL}/currencies/ticker?key=${API_KEY}`
  );

  // filter out top ten cryptos only
  return await response.data.filter(crypt => crypto.rank <= 10);
};

module.exports = { getTopTen };
