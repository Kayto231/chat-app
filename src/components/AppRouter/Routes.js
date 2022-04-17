import RegisterPage from "../AuthPage/RegisterPage";
import ChatPage from "../ChatPage/ChatPage";
import LoginPage from "../AuthPage/LoginPage";

export const LOGIN_PATH = "auth/login";
export const REGISTER_PATH = "auth/register";

export const CHAT_PAGE_PATH = "/";

export const publicRoutes = [
  { path: LOGIN_PATH, element: LoginPage },
  { path: REGISTER_PATH, element: RegisterPage },
];
export const privateRoutes = [{ path: CHAT_PAGE_PATH, element: ChatPage }];
