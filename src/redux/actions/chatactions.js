import {
  ADD_NEW_MESSAGE_TO_ARRAY,
  CREATE_NEW_MESSAGE,
  EXIT_CURRENT_CHAT,
  GET_ALL_USERS,
  GET_CONVERSATIONS,
  LOG_OUT_CHAT,
  SET_MESSAGES,
} from "../reducers/ChatReducer/const";
import {
  createNewConversationUrl,
  createNewMessage,
  getAllUsersUrl,
  getconversations,
  getMessagesUrl,
} from "../../components/URL/const";

import axios from "axios";

export const addNewMessageToArrayAction = (array) => ({
  type: ADD_NEW_MESSAGE_TO_ARRAY,
  payload: array,
});
export const getConversationsAction = (array) => ({
  type: GET_CONVERSATIONS,
  payload: array,
});
export const setCurrentChatMessagesAction = (object) => ({
  type: SET_MESSAGES,
  payload: object,
});
export const createNewMessageAction = (array) => ({
  type: CREATE_NEW_MESSAGE,
  payload: array,
});

export const getAllUsers = (array) => ({
  type: GET_ALL_USERS,
  payload: array,
});
export const logOutChatAction = () => ({
  type: LOG_OUT_CHAT,
});
export const exitCurrentChatAction = () => ({
  type: EXIT_CURRENT_CHAT,
  payload: {
    isChatOpened: false,
    currentConversationId: "",
    currentMessages: [],
  },
});

export const findMessagesFunction = (conv) => {
  return async (dispatch) => {
    const response = await axios
      .post(getMessagesUrl, { conversationId: conv })
      .then((res) => res.data);

    dispatch(
      setCurrentChatMessagesAction({
        messages: response,
        currentConversation: conv,
        isChatOpened: true,
      })
    );
  };
};

export const getConversationsFunction = () => {
  return async (dispatch, getState) => {
    try {
      const { user } = getState().user;
      const response = await axios
        .post(getconversations, { sender: user.id })
        .then((res) => res.data);

      dispatch(getConversationsAction(response));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createNewMessageFunction = ({ recevierId, message }) => {
  return async (dispatch, getState) => {
    const { user } = getState().user;
    const { currentConversation, currentMessages } = getState().chat;
    const { currentSocket } = getState().socket;

    const newMessage = await axios.post(createNewMessage, {
      conversationId: currentConversation._id,
      sender: user.id,
      message,
    });

    currentSocket.emit("sendMessage", { sender: user.id, recevierId, message });

    dispatch(
      setCurrentChatMessagesAction({
        messages: [...currentMessages, newMessage.data],
        currentConversation: currentConversation,
        isChatOpened: true,
      })
    );
  };
};

export const createNewConversationFunction = ({ user, chatUser }) => {
  return async (dispatch, getState) => {
    try {
      const members = [user.id, chatUser._id];
      const response = await axios
        .post(createNewConversationUrl, members)
        .then((res) => res.data);

      if (response) {
        dispatch(getConversationsFunction());
        return new Promise((resolve) => resolve(response));
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const getAllUsersFunction = () => {
  return async (dispatch) => {
    try {
      const users = await axios.get(getAllUsersUrl).then((res) => res.data);

      dispatch(getAllUsers(users));
    } catch (e) {
      console.log(e);
    }
  };
};
