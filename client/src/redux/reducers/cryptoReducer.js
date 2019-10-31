const initialState = {
  savedCryptos: [],
  loading: true,
  filter: {
    min: 0,
    max: 9
  },
  sortByRank: true
};

const cryptoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INITIALIZE_SAVED_DATA":
      return {
        ...state,
        savedCryptos: action.payload
      };
    case "UPDATE_CRYPTO_DATA":
      return {
        ...state,
        savedCryptos: action.payload.map(crypto => {
          // search initial saved cryptos for match
          const savedCrypto = state.savedCryptos.find(
            c => c.currency === crypto.currency
          );
          // if crypto exists on database, combine likes array with api data
          return { ...crypto, likes: savedCrypto ? savedCrypto.likes : [] };
        })
      };
    case "TOGGLE_LOADING":
      return {
        ...state,
        loading: !state.loading
      };
    case "ADD_CRYPTO":
      return {
        ...state,
        savedCryptos: [...state.savedCryptos, action.payload]
      };
    case "UPDATE_LIKES":
      return {
        ...state,
        savedCryptos: state.savedCryptos.map(crypto =>
          crypto.currency === action.payload.currency
            ? { ...crypto, likes: action.payload.likes }
            : crypto
        )
      };
    case "PREVIOUS_CRYPTOS":
      return {
        ...state,
        filter: {
          min: state.filter.min - 10,
          max: state.filter.max - 10
        }
      };
    case "NEXT_CRYPTOS":
      return {
        ...state,
        filter: {
          min: state.filter.min + 10,
          max: state.filter.max + 10
        }
      };
    case "TOGGLE_SORT":
      return {
        ...state,
        sortByRank: !state.sortByRank,
        savedCryptos: action.payload
      };
    default:
      return state;
  }
};

// action creators
export const updateCryptoData = data => {
  return async dispatch => {
    dispatch({
      type: "UPDATE_CRYPTO_DATA",
      payload: data
    });
  };
};

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

export const toggleLoading = () => {
  return async dispatch => {
    dispatch({
      type: "TOGGLE_LOADING"
    });
  };
};

export const previousCryptos = () => {
  return async dispatch => {
    dispatch({
      type: "PREVIOUS_CRYPTOS"
    });
  };
};

export const nextCryptos = () => {
  return async dispatch => {
    dispatch({
      type: "NEXT_CRYPTOS"
    });
  };
};

export const toggleSort = data => {
  return async dispatch => {
    dispatch({
      type: "TOGGLE_SORT",
      payload: data
    });
  };
};

export default cryptoReducer;
