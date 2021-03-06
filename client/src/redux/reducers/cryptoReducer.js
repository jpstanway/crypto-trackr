import {
  updateData,
  updateCryptoLikes,
  initializationCheck,
} from "./cryptoReducer.utils";

const initialState = {
  cryptoData: [],
  loading: true,
  filter: {
    min: 0,
    max: 49,
    viewAll: false,
  },
  sortByRank: true,
  userLikedCryptos: [],
};

const cryptoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INITIALIZE_CRYPTO_DATA":
      return {
        ...state,
        cryptoData: initializationCheck(action.payload, state.cryptoData),
      };
    case "UPDATE_CRYPTO_DATA":
      return {
        ...state,
        cryptoData: updateData(action.payload, state.cryptoData),
      };
    case "TOGGLE_LOADING":
      return {
        ...state,
        loading: !state.loading,
      };
    case "ADD_CRYPTO":
      return {
        ...state,
        cryptoData: [...state.cryptoData, action.payload],
      };
    case "UPDATE_LIKES":
      return {
        ...state,
        cryptoData: updateCryptoLikes(action.payload, state.cryptoData),
      };
    case "PREVIOUS_CRYPTOS":
      return {
        ...state,
        filter: {
          min: state.filter.min - 50,
          max: state.filter.max - 50,
        },
      };
    case "NEXT_CRYPTOS":
      return {
        ...state,
        filter: {
          min: state.filter.min + 50,
          max: state.filter.max + 50,
        },
      };
    case "FIRST_CRYPTOS":
      return {
        ...state,
        filter: {
          min: 0,
          max: 49,
        },
      };
    case "LAST_CRYPTOS":
      return {
        ...state,
        filter: {
          min: state.cryptoData.length - 50,
          max: state.cryptoData.length - 1,
        },
      };
    case "TOGGLE_SORT":
      return {
        ...state,
        sortByRank: !state.sortByRank,
        cryptoData: action.payload,
      };

    case "TOGGLE_VIEW_ALL":
      return {
        ...state,
        filter: {
          min: 0,
          max: state.filter.viewAll ? 49 : state.cryptoData.length,
          viewAll: !state.filter.viewAll,
        },
      };
    case "SET_USER_LIKED_CRYPTOS":
      return {
        ...state,
        userLikedCryptos: action.payload,
      };
    default:
      return state;
  }
};

// action creators
export const initializeCryptoData = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "INITIALIZE_CRYPTO_DATA",
      payload: data,
    });
  };
};

export const updateCryptoData = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "UPDATE_CRYPTO_DATA",
      payload: data,
    });
  };
};

export const addCrypto = (crypto) => {
  return async (dispatch) => {
    dispatch({
      type: "ADD_CRYPTO",
      payload: crypto,
    });
  };
};

export const updateLikes = (crypto) => {
  return async (dispatch) => {
    dispatch({
      type: "UPDATE_LIKES",
      payload: crypto,
    });
  };
};

export const toggleLoading = () => {
  return async (dispatch) => {
    dispatch({
      type: "TOGGLE_LOADING",
    });
  };
};

export const previousCryptos = () => {
  return async (dispatch) => {
    dispatch({
      type: "PREVIOUS_CRYPTOS",
    });
  };
};

export const nextCryptos = () => {
  return async (dispatch) => {
    dispatch({
      type: "NEXT_CRYPTOS",
    });
  };
};

export const firstCryptos = () => {
  return async (dispatch) => {
    dispatch({
      type: "FIRST_CRYPTOS",
    });
  };
};

export const lastCryptos = () => {
  return async (dispatch) => {
    dispatch({
      type: "LAST_CRYPTOS",
    });
  };
};

export const toggleSort = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "TOGGLE_SORT",
      payload: data,
    });
  };
};

export const toggleViewAll = () => {
  return async (dispatch) => {
    dispatch({
      type: "TOGGLE_VIEW_ALL",
    });
  };
};

export const setUserLikedCryptos = (cryptos) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_USER_LIKED_CRYPTOS",
      payload: cryptos,
    });
  };
};

export default cryptoReducer;
