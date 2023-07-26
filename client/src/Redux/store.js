import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { rootReducer } from "./rootReducer";
const initialState = {};

const middleware = [thunk, logger];

export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
