const cryptoReducer = (state = [], action) => {
  switch (action.type) {
    case "INITIALIZE_SAVED_DATA":
      return (state = action.payload);
    case "ADD_CRYPTO":
      return (state = [...state, action.payload]);
    case "UPDATE_LIKES":
      return state.map(crypto =>
        crypto.currency === action.payload.currency
          ? { ...crypto, likes: action.payload.likes }
          : crypto
      );
    default:
      return state;
  }
};

// action creators
export const initializeSavedData = data => {
  return async dispatch => {
    dispatch({
      type: "INITIALIZE_SAVED_DATA",
      payload: data
    });
  };
};

export const addCrypto = crypto => {
  return async dispatch => {
    dispatch({
      type: "ADD_CRYPTO",
      payload: crypto
    });
  };
};

export const updateLikes = crypto => {
  return async dispatch => {
    dispatch({
      type: "UPDATE_LIKES",
      payload: crypto
    });
  };
};

export default cryptoReducer;
