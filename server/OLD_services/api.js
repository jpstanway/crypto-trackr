const axios = require("axios");

async function getTopTen() {
  const { API_URL, API_KEY } = process.env;

  const response = await axios.get(
    `${API_URL}/currencies/ticker?key=${API_KEY}`
  );
  const topTen = await response.data.filter(crypto => crypto.rank <= 10);

  return topTen;
}

module.exports = { getTopTen };
