const changeProperties = (data) => {
  // change certain property names so graphql can read them
  const cryptoObj = data;
  cryptoObj.daily = cryptoObj["1d"];
  cryptoObj.weekly = cryptoObj["7d"];
  cryptoObj.monthly = cryptoObj["30d"];
  cryptoObj.yearly = cryptoObj["365d"];
  return cryptoObj;
};

const createUpdateObject = (obj) => {
  const updateObject = {
    ...obj,
    daily: { ...obj.daily },
    weekly: { ...obj.weekly },
    monthly: { ...obj.monthly },
    yearly: { ...obj.yearly },
    ytd: { ...obj.ytd },
  };

  return updateObject;
};

module.exports = { changeProperties, createUpdateObject };
