const cryptoReducer = (state = [], action) => {
  switch (action.type) {
    case "INITIALIZE_LIKE_DATA":
      return (state = action.payload);
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
export const initializeLikes = data => {
  return async dispatch => {
    dispatch({
      type: "INITIALIZE_LIKE_DATA",
      payload: data
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
