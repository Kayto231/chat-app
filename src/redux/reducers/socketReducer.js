import { CREATE_NEW_CONNECTION, SET_ONLINE_USERS_LIST } from "../const";

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

    default:
      return {
        ...state,
      };
  }
};
