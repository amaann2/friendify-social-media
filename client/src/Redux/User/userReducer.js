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
