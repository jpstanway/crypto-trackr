const axios = require("axios");
const apiKey = require("../config/keys").apiKey;
const apiURL = `https://api.nomics.com/v1/currencies/ticker?key=${apiKey}`;

axios
  .get(apiURL)
  .then(response =>
    console.log(response.data.filter(crypto => crypto.rank <= 10))
  );
