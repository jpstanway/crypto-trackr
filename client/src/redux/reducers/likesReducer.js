const cryptoReducer = (state = [], action) => {
  switch (action.type) {
    case "INITIALIZE_LIKE_DATA":
      return (state = action.payload);
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

export default cryptoReducer;
