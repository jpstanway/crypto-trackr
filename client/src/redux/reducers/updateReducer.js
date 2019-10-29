const updateReducer = (state = true, action) => {
  switch (action.type) {
    case "TOGGLE_LOADING":
      return (state = !state);
    default:
      return state;
  }
};

export const toggleLoading = () => {
  return async dispatch => {
    dispatch({
      type: "TOGGLE_LOADING"
    });
  };
};

export default updateReducer;
