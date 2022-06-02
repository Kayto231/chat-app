import { GET_MESSAGES } from "../reducers/ChatReducer/const";
import {
  CREATE_NEW_CONNECTION,
  LOG_OUT_SOCKET,
  SET_ONLINE_USERS_LIST,
} from "../reducers/SocketReducer/consts";

export const createNewSocketAction = (socket) => ({
  type: CREATE_NEW_CONNECTION,
  payload: socket,
});
export const setOnlineListAction = (users) => ({
  type: SET_ONLINE_USERS_LIST,
  payload: users,
});
export const getMessagesSocketAction = (messages) => ({
  type: GET_MESSAGES,
  payload: messages,
});
export const logOutSocketAction = () => ({
  type: LOG_OUT_SOCKET,
});

export const createNewSocketFunction = ({ socket }) => {
  return async (dispatch, getState) => {
    const { user } = getState().user;
    dispatch(createNewSocketAction(socket));

    const { currentSocket } = getState().socket;
    console.log(currentSocket);
    currentSocket.on("greet", (message) => {});
    currentSocket.emit("addUserToOnlineList", user.id);

    currentSocket.on("sendAllUsersOnline", (users) => {
      dispatch(setOnlineListAction(users));
    });

    currentSocket.on("getMessage", (message) => {
      console.log(message);
      dispatch(getMessagesSocketAction(message));
    });
  };
};
