import axios from "axios";
import { getMessagesUrl } from "../../components/URL/const";
import {
  CHANGE_CHAT_STATE,
  SEND_MESSAGE,
  SET_ACTIVE_CHAT_MESSAGES,
  SET_MESSAGES,
} from "../const";

export const setActiveStateChatAction = (boolean) => ({
  type: CHANGE_CHAT_STATE,
  payload: boolean,
});

export const setActiveChatObjectAction = (array) => ({
  type: SET_ACTIVE_CHAT_MESSAGES,
  payload: array,
});

export const sendMessageAction = (array) => ({
  type: SEND_MESSAGE,
  payload: array,
});
export const getMessagesAction = (array) => ({
  type: SET_MESSAGES,
  payload: array,
});
// export const

export const sendMessageFunction = (array, message) => {
  return (dispatch) => {
    const [messageArrays] = array
      .filter((el) => el.sender === "me")
      .map((el) => el.messagesArray);

    const preArray = [...messageArrays, { message }];

    array
      .filter((el) => el.sender === "me")
      .map((el) => (el.messagesArray = preArray));

    dispatch(sendMessageAction(array));
  };
};

export const getMessagesFunction = (token) => {
  return async (dispatch) => {
    console.log("+");
    const response = await axios.post(
      getMessagesUrl,
      {
        token,
      },
      {
        headers: { "Authorization": `Bearer ${token}` },
      }
    );
    dispatch(getMessagesAction(response.data));
  };
};
