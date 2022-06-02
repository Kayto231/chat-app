import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { chatReducer } from "./../reducers/ChatReducer/chatreducer";
import { userReducer } from "./../reducers/UserReducer/userReducer";
import { socketReducer } from "./../reducers/SocketReducer/socketReducer";
import { bottomNavReducer } from "../reducers/BottomoNavReducer/bottomNavReducer";

const rootReducer = combineReducers({
  chat: chatReducer,
  user: userReducer,
  socket: socketReducer,
  bottomNav: bottomNavReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
