import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatsAsideItem from "../../components/ChatsItem/ChatsAsideItem";
import { findMessagesFunction } from "../../redux/actions/chatactions";

const ShowAsideItems = () => {
  const { conversations } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const chooseConversation = (conversation) => {
    dispatch(findMessagesFunction(conversation));
  };

  return (
    <>
      {conversations.map((conversation, i) => {
        return (
          <ChatsAsideItem
            key={i}
            conversation={conversation}
            onClick={(conversation) => chooseConversation(conversation)}
          />
        );
      })}
    </>
  );
};

export default ShowAsideItems;
