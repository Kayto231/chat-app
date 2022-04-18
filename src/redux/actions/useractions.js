import axios from "axios";
import { authUrl, loginUrl, registerUrl } from "../../components/URL/const";
import { SET_USER_TOKEN } from "../const";

export const loginUserInAction = (object) => ({
  type: SET_USER_TOKEN,
  payload: object,
});

export const registerNewUserFunction = (object) => {
  return async (dispatch) => {
    const response = await axios.post(registerUrl, object);
  };
};

export const loginExistingUserFunction = (object) => {
  return async (dispatch) => {
    const response = await axios.post(loginUrl, object);

    const { token, username, id } = response.data;

    localStorage.setItem("token", token);

    if (response) {
      dispatch(
        loginUserInAction({ user: { username, id }, token: token, state: true })
      );
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
      headers: { "Authorization": `Bearer ${token}` },
    });
    const { username, state, id } = response.data;

    if (response.data.name !== "Token") {
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

export const logOutFunction = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    dispatch(loginUserInAction({ state: false, userToken: "", user: {} }));
  };
};
