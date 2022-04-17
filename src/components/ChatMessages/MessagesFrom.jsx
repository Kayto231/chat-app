import React from "react";

function MessagesFrom({ sender, message }) {
  console.log(message);
  return (
    <div className={`messages__from_${sender}`}>
      <div className='profile_photo'>
        <img src='./img/profilefoto.svg' alt='profilefoto' />
      </div>
      <div className='messages'>
        {<div className='message_item'>{message}</div>}
      </div>
    </div>
  );
}

export default MessagesFrom;
