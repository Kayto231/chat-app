import axios from "axios";
import { authUrl, loginUrl, registerUrl } from "../../components/URL/const";
import {
  LOG_OUT_USER,
  SET_LOGIN_ERROR,
  SET_USER_TOKEN,
} from "../reducers/UserReducer/consts";
import { logOutBottomNavAction } from "./bottomNavActions";
import { logOutChatAction } from "./chatactions";
import { logOutSocketAction } from "./sokectActions";

export const loginUserInAction = (object) => ({
  type: SET_USER_TOKEN,
  payload: object,
});

export const setErrorWhileLoginAction = (state) => ({
  type: SET_LOGIN_ERROR,
  payload: state,
});
export const logOutUserAction = () => ({
  type: LOG_OUT_USER,
});

export const registerNewUserFunction = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const response = await axios
        .post(registerUrl, { username, password })
        .then((res) => res.data);

      if (!response) {
        return new Promise((resolve, reject) =>
          reject({ message: "Somithing " })
        );
      }
      // dispatch(loginExistingUserFunction({ username, password }));
    } catch (e) {
      console.log(e);
    }
  };
};

export const loginExistingUserFunction = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const response = await axios
        .post(loginUrl, { username, password })
        .then((res) => res.data);

      const { token, userName, id } = response;

      localStorage.setItem("token", token);

      if (response) {
        dispatch(
          loginUserInAction({
            user: { userName, id },
            token: token,
            state: true,
          })
        );
      }
    } catch (error) {
      dispatch(setErrorWhileLoginAction(true));

      return new Promise((reject) => reject({ error: error.response.data }));
    }
  };
};

export const isUserStillValidFunction = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return dispatch(loginUserInAction({ isLoading: false }));
    }
    const response = await axios.post(authUrl, token, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const { username, state, id } = response.data;
    if (response.data.name === "TokenExpiredError") {
      localStorage.removeItem("Token");
      dispatch(
        loginUserInAction({
          state: false,
          isLoading: false,
        })
      );
    }
    dispatch(
      loginUserInAction({
        user: { username, status: "Busy", id },
        token: token,
        state,
        isLoading: false,
      })
    );
  };
};

export const logOutUserFunction = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    dispatch(logOutUserAction());
    dispatch(logOutChatAction());
    dispatch(logOutSocketAction());
    dispatch(logOutBottomNavAction());
  };
};
