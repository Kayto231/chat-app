import React from "react";

function ChatsAsideItem({
  isActive = "",
  onClick,
  name,
  img,
  lastMessage,
  messages,
}) {
  return (
    <div
      onClick={() => onClick(messages)}
      className={`chat__profile__info ${isActive}`}
    >
      <div className="chat__profile__photo">
        <img src="./img/profilefoto.svg" alt="profilephoto" />
      </div>
      <div className="chat__description">
        <span className="chat_name">{name}</span>
        <span className="chat_last_message">{lastMessage}</span>
      </div>
      <div className="chat_menu">
        <span className="chat_date">17/06/2020</span>
        <img
          width={5}
          height={5}
          src="./img/unreadmessages.svg"
          alt="unreadmessages"
        />
      </div>
    </div>
  );
}

export default ChatsAsideItem;
