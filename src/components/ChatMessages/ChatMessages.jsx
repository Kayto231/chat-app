import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageFunction } from "../../redux/actions/chatactions";

import Messages from "./Messages";

function ChatMessages() {
  const { isChatOpened, activeChat } = useSelector((state) => state.chat);

  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleSendMessage = () => {
    setInput("");
  };

  return (
    <div
      className={
        isChatOpened ? "chatpage__messages" : "chatpage__messages opacity0"
      }
    >
      <Messages />
      <div className='input__panel'>
        <div className='menu__settings'>
          <img src='./img/menusettings.svg' alt='menusettings' />
        </div>
        <div className='input__menu'>
          <div className='attachment_icon'>
            <img src='./img/attachment-icon.svg' alt='attachment-icon' />
          </div>
          <div className='input__block'>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className='input__message'
              type='text'
              placeholder='Type a new message...'
            />
          </div>
          <div
            className={
              input.length >= 1 ? "send__button" : "send__button opacity05"
            }
          >
            <button
              onClick={() => handleSendMessage()}
              className='button '
              disabled={input.length >= 1 ? false : true}
            >
              <span className='button_text'>Send</span>
              <img src='./img/sendplane.svg' alt='sendplane' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatMessages;
