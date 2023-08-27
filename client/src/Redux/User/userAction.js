import { toast } from "react-toastify";
import { login, logout, signUp, load } from "../../Utils/api";
import { userActionTypes } from "./userActionType";
import axios from "axios";

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
export const signUpUser = (formInput, onSuccess) => async (dispatch) => {
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
    onSuccess();
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

export const getUserProfile = (id) => async (dispatch) => {
  try {
    dispatch({
      type: userActionTypes.USER_PROFILE_REQUEST,
    });
    const res = await axios.get(`/api/v1/users/profile/${id}`);

    dispatch({
      type: userActionTypes.USER_PROFILE_SUCCESS,
      payload: res.data.data.user,
    });
  } catch (error) {
    dispatch({
      type: userActionTypes.USER_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const forgotUserPassword =
  (formInput, onSuccess) => async (dispatch) => {
    try {
      dispatch({
        type: userActionTypes.FORGOT_PASSWORD_REQUEST,
      });
      const res = await axios.post("/api/v1/users/forgotPassword", formInput, {
        withCredentials: true,
      });

      dispatch({
        type: userActionTypes.FORGOT_PASSWORD_SUCCESS,
        payload: res.data.message,
      });
      toast.success(res.data.message);
      onSuccess();
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch({
        type: userActionTypes.FORGOT_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };
export const resetUserPassword =
  (token, formInput, onSuccess) => async (dispatch) => {
    console.log(token);
    console.log(formInput);
    try {
      dispatch({
        type: userActionTypes.RESET_PASSWORD_REQUEST,
      });
      const res = await axios.patch(
        `/api/v1/users/resetPassword/${token}`,
        formInput,
        {
          withCredentials: true,
        }
      );
      dispatch({
        type: userActionTypes.RESET_PASSWORD_SUCCESS,
        payload: res.data.message,
      });
      toast.success(res.data.message);
      onSuccess();
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch({
        type: userActionTypes.RESET_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };

