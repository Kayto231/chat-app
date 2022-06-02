import { LOG_OUT_USER, SET_LOGIN_ERROR, SET_USER_TOKEN } from "./consts";

const initialState = {
  isUserLoggedIn: false,
  userToken: "",
  user: {},
  isLoading: true,
  isError: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_TOKEN:
      return {
        ...state,
        isUserLoggedIn: action.payload.state,
        userToken: action.payload.token,
        user: action.payload.user,
        isLoading: action.payload.isLoading,
      };
    case SET_LOGIN_ERROR:
      return {
        ...state,
        isError: action.payload,
      };
    case LOG_OUT_USER:
      return {
        isUserLoggedIn: false,
        userToken: "",
        user: {},
        isLoading: false,
      };
    default:
      return {
        ...state,
      };
  }
};
