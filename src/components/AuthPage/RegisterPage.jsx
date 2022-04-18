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
    <div className="register__container">
      <div className="register__form">
        <h1 className="text text__big">Register</h1>
        <span className="text text__small">Sign in and start chatting!</span>
        <div className="register__nickname column">
          {nicknameError && (
            <span className="is__error__in__nickname">
              Nickname must be longer than 4 symbols
            </span>
          )}
          <input
            className="input"
            type="text"
            placeholder="Type your nickname."
            value={nickname}
            onChange={(e) => setNicknameHandler(e)}
          />
        </div>
        <div className="register__password column">
          {passwordError && (
            <span className="is__error__in__pasword">
              Nickname must be longer than 4 symbols
            </span>
          )}
          <input
            className="input"
            type="password"
            placeholder="Type your password."
            value={password}
            onChange={(e) => setPasswordHandler(e)}
          />
        </div>
        <div className="register__button__block">
          <button
            className="button register__button"
            disabled={disabled}
            onClick={() => handleLogin()}
          >
            <span className="button__text">Register</span>
          </button>
          <Link className="button link__login" to={"/auth/login"}>
            Get back!
          </Link>
        </div>
        <div className="img">
          <img
            src={"./img/authbackground.svg"}
            className="img__background"
            alt="authbackground"
          />
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
