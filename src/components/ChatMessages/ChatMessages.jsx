import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewMessageToArrayAction,
  createNewMessageFunction,
} from "../../redux/actions/chatactions";

import Messages from "./Messages";

function ChatMessages() {
  const { user } = useSelector((state) => state.user);
  const { isChatOpened, currentMessages, currentConversation, arrivalMessage } =
    useSelector((state) => state.chat);
  const { currentSocket } = useSelector((state) => state.socket);
  const [message, setInput] = useState("");
  const dispatch = useDispatch();

  const handleSendMessage = () => {
    const recevierId = currentConversation.members.find((id) => id !== user.id);

    dispatch(
      createNewMessageFunction(
        currentSocket,
        currentConversation,
        user.id,
        recevierId,
        message,
        currentMessages
      )
    );
    setInput("");
  };
  useEffect(() => {
    dispatch(addNewMessageToArrayAction([...currentMessages, arrivalMessage]));
  }, [arrivalMessage]);

  return (
    <>
      {isChatOpened ? (
        <div
          className={
            isChatOpened ? "chatpage__messages" : "chatpage__messages opacity0"
          }
        >
          <div className="messages__block">
            <Messages currentMessages={currentMessages} />
          </div>
          <div className="input__panel">
            <div className="menu__settings">
              <img src="./img/menusettings.svg" alt="menusettings" />
            </div>
            <div className="input__menu">
              <div className="input__block">
                <input
                  value={message}
                  onChange={(e) => setInput(e.target.value)}
                  className="input__message"
                  type="text"
                  placeholder="Type a new message..."
                />
              </div>
              <div
                className={
                  message.length >= 1
                    ? "send__button"
                    : "send__button opacity05"
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
        </div>
      ) : (
        <div className={isChatOpened ? "welcome" : "welcome opacity0"}>
          <span className="header">Hello to chatUp</span>
          <span className="agitation">
            Choose an existing chat or create a new one!
          </span>
        </div>
      )}
    </>
  );
}

export default ChatMessages;
