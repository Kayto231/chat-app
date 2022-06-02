import {
  ADD_NEW_MESSAGE_TO_ARRAY,
  CREATE_NEW_MESSAGE,
  EXIT_CURRENT_CHAT,
  GET_ALL_USERS,
  GET_CONVERSATIONS,
  GET_MESSAGES,
  LOG_OUT_CHAT,
  SET_MESSAGES,
} from "./const";

const initialState = {
  isChatOpened: false,
  conversations: [],
  currentConversation: {},
  currentMessages: [],
  arrivalMessage: {},
  allUsers: [],
};

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXIT_CURRENT_CHAT:
      return {
        ...state,
        isChatOpened: action.payload.isChatOpened,
        currentMessages: action.payload.currentMessages,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    case GET_CONVERSATIONS:
      return {
        ...state,
        conversations: action.payload,
      };
    case GET_MESSAGES:
      return {
        ...state,
        arrivalMessage: action.payload,
      };
    case ADD_NEW_MESSAGE_TO_ARRAY:
      return {
        ...state,
        currentMessages: action.payload,
      };
    case SET_MESSAGES:
      return {
        ...state,
        isChatOpened: action.payload.isChatOpened,
        currentMessages: action.payload.messages,
        currentConversation: action.payload.currentConversation,
      };
    case CREATE_NEW_MESSAGE:
      return {
        ...state,
        currentMessages: action.payload,
      };
    case LOG_OUT_CHAT:
      return {
        isChatOpened: false,
        conversations: [],
        currentConversation: {},
        currentMessages: [],
        arrivalMessage: {},
        allUsers: [],
      };
    default:
      return {
        ...state,
      };
  }
};
