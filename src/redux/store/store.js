import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { chatReducer } from "../reducers/chatreducer";
import { socketReducer } from "../reducers/socketReducer";
import { userReducer } from "../reducers/userreducer";

const rootReducer = combineReducers({
  chat: chatReducer,
  user: userReducer,
  socket: socketReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
