require("../server");
const mongoose = require("mongoose");
const { Query, Mutation } = require("../graphql-schema/resolvers");
const Crypto = require("../models/Crypto");

const { initialCryptos } = require("../utils/crypto_helper");

describe("retrieve crypto data from third party api", () => {
  test("can obtain crypto data from api", async () => {
    const cryptoData = await Query.getSingleCrypto(null, { currency: "btc" });

    expect(cryptoData).toBeTruthy();
    expect(cryptoData).toHaveProperty("currency", "BTC");
    expect(cryptoData).toHaveProperty("price");
  });

  test("currency metadata is returned", async () => {
    const cryptoMetaData = await Query.getCryptoMetaData(null, {
      currency: "btc"
    });
    expect(cryptoMetaData).toBeTruthy();
    expect(cryptoMetaData).toHaveProperty("id", "BTC");
    expect(cryptoMetaData).toHaveProperty("name", "Bitcoin");
  });
});

describe("retrieve and manipulate data from database", () => {
  beforeEach(async () => {
    // clear database and save new crypto objects before each test
    await Crypto.deleteMany({});

    const cryptoObjects = initialCryptos.map(crypto => new Crypto(crypto));
    const promiseArray = cryptoObjects.map(crypto => crypto.save());
    await Promise.all(promiseArray);
  });

  test("saved crypto data is returned", async () => {
    const cryptoData = await Query.getCryptoData();
    expect(cryptoData).toBeTruthy();
  });

  test("new crypto can be saved to database", async () => {
    const cryptosToSave = [
      {
        currency: "LTC",
        price: "58.85",
        circulating_supply: "63601796",
        name: "Litecoin",
        logo_url:
          "https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/ltc.png",
        market_cap: "3742691658",
        rank: "6"
      }
    ];

    await Mutation.addCryptos(null, { cryptosToSave });
    const savedCryptos = await Crypto.find({});

    expect(savedCryptos.length).toBe(initialCryptos.length + 1);
  });

  test("previously saved crypto can be updated", async () => {
    const cryptosToSave = [
      {
        currency: "BTC",
        price: "20020.19"
      }
    ];

    await Mutation.addCryptos(null, { cryptosToSave });
    const updatedCrypto = await Crypto.findOne({
      currency: cryptosToSave[0].currency
    });

    expect(updatedCrypto.price).toBe(cryptosToSave[0].price);
  });

  test("cryptos likes are updated and saved when they are liked", async () => {
    const cryptoToLike = { currency: "ETH" };
    const likedCrypto = await Mutation.addLike(null, cryptoToLike);

    expect(likedCrypto.likes.length).toBe(1);
  });

  test("crypto can be removed from the database", async () => {
    const cryptoToRemove = { currency: "XRP" };
    await Mutation.removeCrypto(null, cryptoToRemove);

    const savedCryptos = await Crypto.find({});

    expect(savedCryptos.length).toBe(initialCryptos.length - 1);
  });

  afterAll(() => {
    mongoose.connection.close();
  });
});
