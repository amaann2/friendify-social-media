import { userActionTypes } from "./userActionType";

const INITIAL_STATE = {
  currentUser: null,
  isAuthentication: false,
  loading: false,
  error: null,
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.LOAD_USER_REQUEST:
      return {
        ...state,
        currentUser: null,
        isAuthentication: false,
        error: null,
      };
    case userActionTypes.SET_USER_REQUEST:
      return {
        ...state,
        loading: true,
        currentUser: null,
        isAuthentication: false,
        error: null,
      };
    case userActionTypes.SET_USER_SUCCESS:
    case userActionTypes.LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
        isAuthentication: true,
      };
    case userActionTypes.SET_USER_FAIL:
    case userActionTypes.LOAD_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        currentUser: null,
        isAuthentication: false,
      };
    case userActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        currentUser: null,
        isAuthentication: false,
      };
    case userActionTypes.LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        currentUser: null,
        isAuthentication: false,
      };

    default:
      return state;
  }
};

export const userProfile = (state = { profile: [] }, action) => {
  switch (action.type) {
    case userActionTypes.USER_PROFILE_REQUEST:
      return {
        loading: true,
        error: null,
        profile: [],
      };
    case userActionTypes.USER_PROFILE_SUCCESS:
      return {
        loading: false,
        profile: action.payload,
        error: null,
      };
    case userActionTypes.USER_PROFILE_FAIL:
      return {
        loading: false,
        profile: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

export const forgotUserPassword = (state = {}, action) => {
  switch (action.type) {
    case userActionTypes.FORGOT_PASSWORD_REQUEST:
    case userActionTypes.RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case userActionTypes.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case userActionTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    case userActionTypes.FORGOT_PASSWORD_FAIL:
    case userActionTypes.RESET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
