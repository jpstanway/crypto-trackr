import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import cryptoReducer from "./reducers/cryptoReducer";
import updateReducer from "./reducers/updateReducer";

const rootReducer = combineReducers({
  savedCryptos: cryptoReducer,
  loading: updateReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
