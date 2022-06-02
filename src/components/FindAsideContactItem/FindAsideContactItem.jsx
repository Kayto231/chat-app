import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewConversationFunction,
  findMessagesFunction,
} from "../../redux/actions/chatactions";

function FindAsideContactItem({ chatUser }) {
  const { allUsers, conversations } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function startConversation(e) {
    const isConversationAlready = conversations.filter((conversation) =>
      conversation?.members?.includes(chatUser._id)
    );

    if (isConversationAlready.length > 0) {
      dispatch(findMessagesFunction(...isConversationAlready));
    } else {
      const createdConversationPromise = dispatch(
        createNewConversationFunction({ user, chatUser })
      );
      createdConversationPromise.then((res) =>
        dispatch(findMessagesFunction(res))
      );
    }
  }
  return (
    <div
      onClick={() => startConversation(chatUser)}
      className={`chat__profile__info`}
    >
      <div className="chat__profile__photo">
        <img src="./img/profilefoto.svg" alt="profilephoto" />
      </div>
      <div className="chat__description">
        <span className="chat_name">{chatUser.username}</span>
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

export default FindAsideContactItem;
