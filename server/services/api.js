const axios = require("axios");
const apiKey = require("../config/keys").apiKey;
const apiURL = `https://api.nomics.com/v1/currencies/ticker?key=${apiKey}`;

axios.get(apiURL).then(response => {
  const topTen = response.data.filter(crypto => crypto.rank <= 10);
  console.log(topTen);
});
