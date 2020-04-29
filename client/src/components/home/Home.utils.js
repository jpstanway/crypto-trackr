// while api data is loading, render recent 50 saved cryptos
export const showMostRecentData = (cryptos) => {
  return cryptos
    .filter((crypto) => crypto.rank >= 1 && crypto.rank <= 50)
    .sort((a, b) => a.rank - b.rank);
};

// after loading completes, render new data from api
export const showNewData = (cryptos, search) => {
  const data = cryptos.cryptoData.filter((crypto, index) => {
    if (search) {
      return (
        crypto.name
          .toLowerCase()
          .startsWith(search.toLowerCase().substr(0, 1)) &&
        crypto.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return index >= cryptos.filter.min && index <= cryptos.filter.max;
  });

  return data;
};

// update first 50 cryptos in database
export const getCryptosToSave = (cryptos) => {
  return cryptos
    .filter((crypto) => crypto.rank <= 50)
    .map((crypto) => {
      // separate fields not to be saved
      const { id, __typename, price_date, likes, ...otherProps } = crypto;

      // remove unwanted properties from nested objects
      if (otherProps.daily) delete otherProps.daily.__typename;
      if (otherProps.weekly) delete otherProps.weekly.__typename;
      if (otherProps.monthly) delete otherProps.monthly.__typename;
      if (otherProps.yearly) delete otherProps.yearly.__typename;
      if (otherProps.ytd) delete otherProps.ytd.__typename;

      return otherProps;
    });
};
