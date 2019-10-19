const initialState = {
  allCryptos: [],
  metadata: []
};

const cryptoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INITIALIZE_CRYPTOS":
      return {
        ...state,
        allCryptos: action.payload
      };
    default:
      return state;
  }
};

// action creators
export const initializeCryptos = cryptos => {
  return async dispatch => {
    dispatch({
      type: "INITIALIZE_CRYPTOS",
      payload: cryptos
    });
  };
};

export default cryptoReducer;
