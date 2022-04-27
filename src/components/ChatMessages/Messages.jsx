import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

function Messages({ currentMessages }) {
  const { arrivalMessage } = useSelector((state) => state.chat);

  const { user } = useSelector((state) => state.user);
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages]);

  console.log(currentMessages);

  // useEffect(() => {
  //   arrivalMessage && currentMessages.
  // },[arrivalMessage])

  return (
    <ul className="main_messages_panel">
      {currentMessages.map((el, i) =>
        el.sender === user.id ? (
          <li ref={scrollRef} key={i} className={`messages__from me`}>
            <div className="profile_photo">
              <img src="./img/profilefoto.svg" alt="profilefoto" />
            </div>
            <div className="message_item">{el.message}</div>
          </li>
        ) : (
          <li key={i} className={`messages__from sender`}>
            <div className="profile_photo">
              <img src="./img/profilefoto.svg" alt="profilefoto" />
            </div>
            <div className="message_item">{el.message}</div>
          </li>
        )
      )}
    </ul>
  );
}

export default Messages;
