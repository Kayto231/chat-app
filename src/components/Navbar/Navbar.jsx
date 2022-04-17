import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveChatObjectAction,
  setActiveStateChatAction,
} from "../../redux/actions/chatactions";
import { logOutFunction } from "../../redux/actions/useractions";

function NavBar() {
  const { isChatOpened } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [display, setDisplay] = useState(false);

  const handleExit = () => {
    dispatch(setActiveStateChatAction(false));
    dispatch(setActiveChatObjectAction([]));
  };
  return (
    <header className='main__header'>
      <div className='profile__info'>
        <div className='profilephoto'>
          <img src='./img/profilefoto.svg' alt='profilephoto' />
        </div>
        <div className='description'>
          <span className='name'>{user.username}</span>
          <div className='status__block'>
            <span className='status'>{user.status}</span>
            <img src='./img/downarrow.svg' alt='downarrow' />
          </div>
        </div>
        <div onClick={() => setDisplay(!display)} className='menu'>
          <img src='./img/menusettings.svg' alt='menusettings' />
          <div
            className={
              display ? "dropdown__menu " : "dropdown__menu display__none"
            }
          >
            <span
              onClick={() => dispatch(logOutFunction())}
              className='dropdown__item'
            >
              Logout
            </span>
            <span className='dropdown__item'>Profile</span>
          </div>
        </div>
      </div>
      <div className='switcher__buttons'>
        {isChatOpened && (
          <span className='exit__button' onClick={() => handleExit()}>
            Get back
          </span>
        )}
        <button className='button left isActive'>Chat</button>
        <button className='button'>Media</button>
      </div>
    </header>
  );
}

export default NavBar;
