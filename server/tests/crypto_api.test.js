require("../server");
const mongoose = require("mongoose");
const { Query, Mutation } = require("../graphql-schema/resolvers");

describe("retrieve crypto data from third party api", () => {
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
  test("saved crypto data is returned", async () => {
    const cryptoData = await Query.getCryptoData();
    expect(cryptoData).toBeTruthy();
  });

  afterAll(() => {
    mongoose.connection.close();
  });
});
