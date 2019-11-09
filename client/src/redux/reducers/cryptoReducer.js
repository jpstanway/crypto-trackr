const initialState = {
  cryptoData: [],
  loading: true,
  filter: {
    min: 0,
    max: 49,
    viewAll: false
  },
  sortByRank: true
};

const cryptoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INITIALIZE_CRYPTO_DATA":
      return {
        ...state,
        cryptoData: action.payload
      };
    case "UPDATE_CRYPTO_DATA":
      return {
        ...state,
        cryptoData: action.payload.map(crypto => {
          // search initial saved cryptos for match
          const savedCrypto = state.cryptoData.find(
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
        cryptoData: [...state.cryptoData, action.payload]
      };
    case "UPDATE_LIKES":
      return {
        ...state,
        cryptoData: state.cryptoData.map(crypto =>
          crypto.currency === action.payload.currency
            ? { ...crypto, likes: action.payload.likes }
            : crypto
        )
      };
    case "PREVIOUS_CRYPTOS":
      return {
        ...state,
        filter: {
          min: state.filter.min - 50,
          max: state.filter.max - 50
        }
      };
    case "NEXT_CRYPTOS":
      return {
        ...state,
        filter: {
          min: state.filter.min + 50,
          max: state.filter.max + 50
        }
      };
    case "TOGGLE_SORT":
      return {
        ...state,
        sortByRank: !state.sortByRank,
        cryptoData: action.payload
      };

    case "TOGGLE_VIEW_ALL":
      return {
        ...state,
        filter: {
          min: 0,
          max: state.filter.viewAll ? 49 : state.cryptoData.length,
          viewAll: !state.filter.viewAll
        }
      };
    default:
      return state;
  }
};

// action creators
export const initializeCryptoData = data => {
  return async dispatch => {
    dispatch({
      type: "INITIALIZE_CRYPTO_DATA",
      payload: data
    });
  };
};

export const updateCryptoData = data => {
  return async dispatch => {
    dispatch({
      type: "UPDATE_CRYPTO_DATA",
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

export const toggleViewAll = () => {
  return async dispatch => {
    dispatch({
      type: "TOGGLE_VIEW_ALL"
    });
  };
};

export default cryptoReducer;
