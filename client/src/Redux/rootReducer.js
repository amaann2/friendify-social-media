import { userProfile, userReducer } from "./User/userReducer";
import { combineReducers } from "@reduxjs/toolkit";
import postSlice from "./Post/postSlice";
export const rootReducer = combineReducers({
  user: userReducer,
  post: postSlice,
  profile: userProfile,
});
