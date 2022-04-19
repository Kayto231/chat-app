import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  findMessagesFunction,
  getConversationsFunction,
} from "../../redux/actions/chatactions";
import ChatMessages from "../ChatMessages/ChatMessages";
import ChatsAsideItem from "../ChatsItem/ChatsAsideItem";
import NavBar from "../Navbar/Navbar";
import { createNewSocketFunction } from "../../redux/actions/sokectActions";
import { socketConnectionUrl } from "../URL/const";
import { io } from "socket.io-client";

function ChatPage() {
  const { user } = useSelector((state) => state.user);

  const { isChatOpened, conversations, currentMessages } = useSelector(
    (state) => state.chat
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConversationsFunction(user.id));
  }, []);

  useEffect(() => {
    const socket = io(socketConnectionUrl, {
      transports: ["websocket", "polling", "flashsocket"],
    });
    dispatch(createNewSocketFunction(socket, user.id, currentMessages));
  }, [user]);

  const chooseConversation = (conv) => {
    dispatch(findMessagesFunction(conv));
  };
  return (
    <div className="chatpage">
      <NavBar />
      <div className="chatpage__content">
        <div
          className={
            isChatOpened
              ? "chatpage__navigation opacity0 "
              : "chatpage__navigation"
          }
        >
          <div className="chats">
            {conversations.map((el, i) => {
              return (
                <ChatsAsideItem
                  key={i}
                  conversation={el}
                  onClick={(conv) => chooseConversation(conv)}
                />
              );
            })}
          </div>
          <div className="bottom__panel">
            <ul className="bottom__menu">
              <li className="item active">
                <img src="./img/chats.svg" alt="chats" />
              </li>
              <li className="item">
                <img src="./img/something.svg" alt="something" />
              </li>
              <li className="item">
                <img src="./img/favorite.svg" alt="favorite" />
              </li>
              <li className="item">
                <img src="./img/search.svg" alt="search" />
              </li>
            </ul>
          </div>
        </div>
        <ChatMessages />
      </div>
    </div>
  );
}

export default ChatPage;
