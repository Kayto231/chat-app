import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./ChatsAsideItem_Style.scss";

function ChatsAsideItem({
  isActive = "",
  onClick,
  lastMessage,
  conversation,
  name,
}) {
  const { allUsers } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const [friendName, setFriendName] = useState("");

  useEffect(() => {
    if (conversation) {
      const [friendId] = conversation?.members.filter((id) => id !== user?.id);
      const [friendObject] = allUsers.filter((user) => user._id === friendId);

      setFriendName(friendObject?.username);
    } else {
      setFriendName(name);
    }
  }, [conversation]);
  return (
    <div
      onClick={() => onClick(conversation)}
      className={`chat__profile__info ${isActive}`}
    >
      <div className="chat__profile__photo">
        <img src="./img/profilefoto.svg" alt="profilephoto" />
      </div>
      <div className="chat__description">
        <span className="chat_name">{friendName}</span>
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
