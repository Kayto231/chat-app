import {
  CREATE_NEW_CONNECTION,
  LOG_OUT_SOCKET,
  SET_ONLINE_USERS_LIST,
} from "./consts";

const initialState = {
  currentSocket: {},
  usersOnline: [],
};

export const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NEW_CONNECTION:
      return {
        ...state,
        currentSocket: action.payload,
      };
    case SET_ONLINE_USERS_LIST:
      return {
        ...state,
        usersOnline: action.payload,
      };
    case LOG_OUT_SOCKET:
      return {
        currentSocket: {},
        usersOnline: [],
      };
    default:
      return {
        ...state,
      };
  }
};
