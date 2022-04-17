import { SET_USER_TOKEN } from "../const";

const initialState = {
  isUserLoggedIn: false,
  userToken: "",
  user: {},
  isLoading: true,
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
    default:
      return {
        ...state,
      };
  }
};
