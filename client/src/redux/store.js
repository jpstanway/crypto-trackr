import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import cryptoReducer from "./reducers/cryptoReducer";
import notificationReducer from "./reducers/notificationReducer";

const rootReducer = combineReducers({
  cryptos: cryptoReducer,
  notification: notificationReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
