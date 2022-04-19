import {
  CREATE_NEW_CONNECTION,
  GET_MESSAGES,
  SET_ONLINE_USERS_LIST,
} from "../const";

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

export const createNewSocketFunction = (socket, userId) => {
  return async (dispatch) => {
    socket.emit("addUserToOnlineList", userId);
    socket.on("sendAllUsersOnline", (users) => {
      dispatch(setOnlineListAction(users));
    });

    socket.on("getMessage", (message) => {
      dispatch(getMessagesSocketAction(message));
    });
    socket.on("greet", (message) => {});
    dispatch(createNewSocketAction(socket));
  };
};
