const cryptoReducer = (state = [], action) => {
  switch (action.type) {
    case "INITIALIZE_CRYPTOS":
      return (state = action.payload);
    default:
      return state;
  }
};

// action creators

// all cryptos
export const initializeCryptos = cryptos => {
  return async dispatch => {
    dispatch({
      type: "INITIALIZE_CRYPTOS",
      payload: cryptos
    });
  };
};

// metadata

// like crypto

export default cryptoReducer;
