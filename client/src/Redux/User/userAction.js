import { toast } from "react-toastify";
import { login, logout, signUp, load } from "../../Utils/api";
import { userActionTypes } from "./userActionType";

export const loginUser = (formInput, onSuccess) => async (dispatch) => {
  try {
    dispatch({
      type: userActionTypes.SET_USER_REQUEST,
    });
    const res = await login(formInput);
    dispatch({
      type: userActionTypes.SET_USER_SUCCESS,
      payload: res.data.user,
    });
    toast.success(res.data.status);
    onSuccess();
  } catch (error) {
    toast.error(error.response.data.message);
    dispatch({
      type: userActionTypes.SET_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const signUpUser = (formInput) => async (dispatch) => {
  try {
    dispatch({
      type: userActionTypes.SET_USER_REQUEST,
    });
    const res = await signUp(formInput);
    dispatch({
      type: userActionTypes.SET_USER_SUCCESS,
      payload: res.data.user,
    });
    toast.success(res.data.status);
  } catch (error) {
    toast.error(error.response.data.message);

    dispatch({
      type: userActionTypes.SET_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const logoutUser = () => async (dispatch) => {
  try {
    const res = await logout();
    dispatch({
      type: userActionTypes.LOGOUT_SUCCESS,
      payload: res.data.message,
    });
  } catch (error) {
    dispatch({
      type: userActionTypes.LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: userActionTypes.LOAD_USER_REQUEST,
    });
    const res = await load();

    dispatch({
      type: userActionTypes.LOAD_USER_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: userActionTypes.LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};
