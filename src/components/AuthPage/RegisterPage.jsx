import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerNewUserFunction } from "../../redux/actions/useractions";

function RegisterPage() {
  const [nickname, setNickname] = useState("");
  const [nicknameError, setNicknameError] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, serPasswordError] = useState("");

  const [disabled, setDisabled] = useState(false);

  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(registerNewUserFunction({ username: nickname, password }));
    setNickname("");
    setPassword("");
  };
  const setNicknameHandler = (event) => {
    setNickname(event.target.value);
    nickname.length <= 3 ? setNicknameError(true) : setNicknameError(false);
  };
  const setPasswordHandler = (event) => {
    setPassword(event.target.value);
    password.length <= 3 ? serPasswordError(true) : serPasswordError(false);
    nickname.length >= 3 && password.length >= 3
      ? setDisabled(false)
      : setDisabled(true);
  };
  return (
    <div className='register__container'>
      <div className='register__text'>
        <Link className='button link__back' to={"auth/login"}>
          Get back
        </Link>
        <div className='register__welcome'>
          <span>Welcome to chat up!</span>
          <span>Registration</span>
        </div>
      </div>
      <div className='register__form'>
        <div className='register__nickname'>
          {nicknameError && (
            <span className='is__error__in__nickname'>
              Nickname must be longer than 4 symbols
            </span>
          )}
          <input
            className='input'
            type='text'
            placeholder='Type your nickname.'
            value={nickname}
            onChange={(e) => setNicknameHandler(e)}
          />
        </div>
        <div className='register__password'>
          {passwordError && (
            <span className='is__error__in__pasword'>
              Nickname must be longer than 4 symbols
            </span>
          )}
          <input
            className='input'
            type='password'
            placeholder='Type your password.'
            value={password}
            onChange={(e) => setPasswordHandler(e)}
          />
        </div>
        <div className='register__button__block'>
          <button
            className='button register__button'
            disabled={disabled}
            onClick={() => handleLogin()}
          >
            <span className='button__text'>Register</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
