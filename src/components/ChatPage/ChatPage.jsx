import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMessagesFunction,
  setActiveChatObjectAction,
  setActiveStateChatAction,
} from "../../redux/actions/chatactions";
import ChatMessages from "../ChatMessages/ChatMessages";
import ChatsAsideItem from "../ChatsItem/ChatsAsideItem";
import NavBar from "../Navbar/Navbar";

function ChatPage() {
  const { isChatOpened, messages } = useSelector((state) => state.chat);
  const { userToken, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleClick = (messages) => {
    dispatch(setActiveStateChatAction(true));
    dispatch(setActiveChatObjectAction(messages));
  };

  useEffect(() => {
    dispatch(getMessagesFunction(userToken));
  }, []);
  console.log(messages);
  return (
    <div className='chatpage'>
      <NavBar />
      <div className='chatpage__content'>
        <div
          className={
            isChatOpened
              ? "chatpage__navigation opacity0 "
              : "chatpage__navigation"
          }
        >
          <div className='chats'>
            {messages.map((el, i) => {
              return (
                <ChatsAsideItem
                  key={i}
                  name={el.sender}
                  messages={el.messages}
                  onClick={(e) => handleClick(e)}
                />
              );
            })}
          </div>
          <div className='bottom__panel'>
            <ul className='bottom__menu'>
              <li className='item active'>
                <img src='./img/chats.svg' alt='chats' />
              </li>
              <li className='item'>
                <img src='./img/something.svg' alt='something' />
              </li>
              <li className='item'>
                <img src='./img/favorite.svg' alt='favorite' />
              </li>
              <li className='item'>
                <img src='./img/search.svg' alt='search' />
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
