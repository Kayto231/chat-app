import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewMessageToArrayAction } from "../../redux/actions/chatactions";

import Messages from "./Messages";
import "./ChatMessages_Style.scss";
import ChatInput from "../ChatInput/ChatInput";

function ChatMessages() {
  const { isChatOpened, currentMessages, arrivalMessage, currentConversation } =
    useSelector((state) => state.chat);
  const dispatch = useDispatch();

  useEffect(() => {
    arrivalMessage &&
      currentConversation?.members?.includes(arrivalMessage?.sender) &&
      dispatch(
        addNewMessageToArrayAction([...currentMessages, arrivalMessage])
      );
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
          <ChatInput />
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
