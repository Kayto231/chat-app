import React from "react";
import { useSelector } from "react-redux";
import MessageData from "./MessageData";
import MessagesFrom from "./MessagesFrom";

function Messages() {
  const { activeChat } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);

  return (
    <div className='main_messages_panel'>
      {activeChat.map((el) =>
        el._id === user.id
          ? activeChat.map((el, i) => {
              return (
                <MessagesFrom sender={"me"} key={i} message={el.message} />
              );
            })
          : activeChat.map((el, i) => {
              console.log(el.message);
              return (
                <MessagesFrom sender={"sender"} key={i} message={el.message} />
              );
            })
      )}
      <MessageData />
    </div>
  );
}

export default Messages;
