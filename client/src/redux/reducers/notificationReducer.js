const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return (state = action.payload);
    case "REMOVE_NOTIFICATION":
      return (state = "");
    default:
      return state;
  }
};

export const setNotification = message => {
  return async dispatch => {
    dispatch({
      type: "SET_NOTIFICATION",
      payload: message
    });

    setTimeout(() => {
      dispatch({
        type: "REMOVE_NOTIFICATION"
      });
    }, 5000);
  };
};

export default notificationReducer;
