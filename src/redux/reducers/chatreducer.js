import {
  CHANGE_CHAT_STATE,
  SEND_MESSAGE,
  SET_ACTIVE_CHAT_MESSAGES,
  SET_MESSAGES,
} from "../const";

const initialState = {
  isChatOpened: false,
  activeChat: [],
  messages: [],
};

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        ...state,
        activeChat: action.payload,
      };
    case SET_ACTIVE_CHAT_MESSAGES:
      return {
        ...state,
        activeChat: action.payload,
      };
    case CHANGE_CHAT_STATE:
      return {
        ...state,
        isChatOpened: action.payload,
      };
    case SET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
