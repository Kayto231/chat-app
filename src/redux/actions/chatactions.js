import axios from "axios";
import {
  createNewMessage,
  getconversations,
  getMessagesUrl,
} from "../../components/URL/const";
import {
  ADD_NEW_MESSAGE_TO_ARRAY,
  CREATE_NEW_MESSAGE,
  EXIT_CURRENT_CHAT,
  GET_CONVERSATIONS,
  SET_MESSAGES,
} from "../const";

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
    const response = await axios.post(getMessagesUrl, { conversationId: conv });
    dispatch(
      setCurrentChatMessagesAction({
        messages: response.data,
        currentConversation: conv,
        isChatOpened: true,
      })
    );
  };
};

export const getConversationsFunction = (userId) => {
  return async (dispatch) => {
    const response = await axios.post(getconversations, { sender: userId });
    dispatch(getConversationsAction(response.data));
  };
};

export const createNewMessageFunction = (
  currentSocket,
  currentConversation,
  sender,
  recevierId,
  message,
  messages
) => {
  return async (dispatch) => {
    const newMessage = await axios.post(createNewMessage, {
      conversationId: currentConversation._id,
      sender,
      message,
    });
    currentSocket.emit("sendMessage", { sender, recevierId, message });

    dispatch(
      setCurrentChatMessagesAction({
        messages: [...messages, newMessage.data],
        currentConversation: currentConversation,
        isChatOpened: true,
      })
    );
  };
};
