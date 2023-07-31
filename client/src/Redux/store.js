import thunk from "redux-thunk";
import logger from "redux-logger";
// import { composeWithDevTools } from "redux-devtools-extension";
// import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { rootReducer } from "./rootReducer";
import { configureStore } from "@reduxjs/toolkit";
const initialState = {};

const middleware = [thunk, logger];

const middlewareBuilder = (getDefaultMiddleware) => {
  return [...getDefaultMiddleware(), ...middleware];
};
export const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  middleware: middlewareBuilder,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
