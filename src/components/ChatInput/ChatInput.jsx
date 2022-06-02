import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewMessageFunction } from "../../redux/actions/chatactions";
import "./ChatInput_Style.scss";

function ChatInput() {
  const [message, setMessage] = useState("");

  const { user } = useSelector((state) => state.user);
  const { currentConversation } = useSelector((state) => state.chat);

  const dispatch = useDispatch();

  const handleSendMessage = () => {
    const recevierId = currentConversation.members.find((id) => id !== user.id);

    dispatch(
      createNewMessageFunction({
        recevierId,
        message,
      })
    );
    setMessage("");
  };

  function handleKeyDownPress(e) {
    if (e.code === "Enter") {
      handleSendMessage();
    }
  }

  return (
    <div className="input__panel">
      <div className="menu__settings">
        <img src="./img/menusettings.svg" alt="menusettings" />
      </div>
      <div className="input__menu">
        <div className="input__block">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="input__message"
            type="text"
            placeholder="Type a new message..."
            onKeyDown={handleKeyDownPress}
          />
        </div>
        <div
          className={
            message.length >= 1 ? "send__button" : "send__button opacity05"
          }
        >
          <button
            onClick={() => handleSendMessage()}
            className="button "
            disabled={message.length >= 1 ? false : true}
          >
            <span className="button_text">Send</span>
            <img src="./img/sendplane.svg" alt="sendplane" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatInput;
