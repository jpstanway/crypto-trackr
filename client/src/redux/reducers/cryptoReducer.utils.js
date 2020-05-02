export const updateData = (data, state) => {
  return data.map((crypto) => {
    // search initial saved cryptos for match
    const savedCrypto = state.find((c) => c.currency === crypto.currency);
    // if crypto exists on database, combine likes array with api data
    return { ...crypto, likes: savedCrypto ? savedCrypto.likes : [] };
  });
};

export const updateCryptoLikes = (data, state) => {
  return state.map((crypto) =>
    crypto.currency === data.currency
      ? { ...crypto, likes: data.likes }
      : crypto
  );
};

export const initializationCheck = (data, state) => {
  // only initialize the store if it's empty
  if (state.length === 0) {
    return data;
  }

  return state;
};
