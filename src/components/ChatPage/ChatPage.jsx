import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsersFunction,
  getConversationsFunction,
} from "../../redux/actions/chatactions";
import ChatMessages from "../ChatMessages/ChatMessages";
import NavBar from "../Navbar/Navbar";
import { createNewSocketFunction } from "../../redux/actions/sokectActions";
import { socketConnectionUrl } from "../URL/const";
import { io } from "socket.io-client";
import "./ChatPage_Style.scss";
import BottomNavigation from "../BottomNavigation/BottomNavigation";
import ShowAsideItems from "../../Helpers/ShowAsideItems/ShowAsideItems";
import FindContact from "../../Helpers/FindContact/FindContact";

function ChatPage() {
  const { user } = useSelector((state) => state.user);
  const { currentItem } = useSelector((state) => state.bottomNav);

  const { isChatOpened } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsersFunction());
    dispatch(getConversationsFunction());
  }, []);

  useEffect(() => {
    const socket = io(socketConnectionUrl, {
      cors: {
        origin: "http://localhost:3000",
        credentials: true,
      },
      transports: ["websocket"],
    });
    dispatch(createNewSocketFunction({ socket }));
  }, [user]);

  function switchBottomNavItem() {
    switch (currentItem) {
      case 1:
        return <ShowAsideItems />;
      case 2:
        return <div>2</div>;
      case 3:
        return <div>3</div>;
      case 4:
        return <FindContact />;
      default:
        return <ShowAsideItems />;
    }
  }

  return (
    <div className="chatpage">
      <NavBar />
      <div className="chatpage__content">
        <div
          className={
            isChatOpened
              ? "chatpage__navigation opacity0 "
              : "chatpage__navigation"
          }
        >
          <div className="chats">{switchBottomNavItem()}</div>
          <div className="bottom__panel">
            <BottomNavigation />
          </div>
        </div>
        <ChatMessages />
      </div>
    </div>
  );
}

export default ChatPage;
