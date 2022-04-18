import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  isUserStillValidFunction,
  loginExistingUserFunction,
} from "../../redux/actions/useractions";

function LoginPage() {
  const { isLoading } = useSelector((state) => state.user);

  const [nickname, setNickname] = useState("");
  const [nicknameError, setNicknameError] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, serPasswordError] = useState("");

  const [disabled, setDisabled] = useState(false);
  const [checkBox, setCheckBox] = useState(false);

  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(loginExistingUserFunction({ username: nickname, password }));
    // dispatch(loginExistingUserFunction({ username: "Alex", password: "123" }));

    setNickname("");
    setPassword("");
  };
  const setNicknameHandler = (event) => {
    setNickname(event.target.value);
    nickname.length <= 3 ? setNicknameError(true) : setNicknameError(false);
  };
  const setPasswordHandler = (event) => {
    setPassword(event.target.value);
    password.length <= 2 ? serPasswordError(true) : serPasswordError(false);
    nickname.length >= 3 && password.length >= 2
      ? setDisabled(false)
      : setDisabled(true);
  };
  useEffect(() => {
    dispatch(isUserStillValidFunction());
  }, []);

  return (
    <div className="login__container">
      {!isLoading ? (
        <>
          <div className="login__form">
            <h1 className="text text__big">Sign in</h1>
            <span className="text text__small">
              Sign in and start managing your candidates!
            </span>
            <div className="login__nickname column">
              {nicknameError && (
                <span className="is__error__in__nickname">
                  Nickname must be longer than 4 symbols
                </span>
              )}
              <input
                className="input"
                type="text"
                placeholder="Type your login."
                value={nickname}
                onChange={(e) => setNicknameHandler(e)}
              />
            </div>
            <div className="login__password column">
              {passwordError && (
                <span className="is__error__in__pasword">
                  Password must be longer than 4 symbols
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
            <div className="btn">
              <div
                className="remember__me"
                onClick={() => setCheckBox(!checkBox)}
              >
                {checkBox ? (
                  <img
                    className="checkbox"
                    src={"./img/tick-checkbox.svg"}
                    alt="tick-checkbox"
                  />
                ) : (
                  <div className="checkbox" />
                )}

                <span className="rebember__me__text">Remember me</span>
              </div>
              <div className="forgot__pass">
                <Link className="forgot__link" to={"#"}>
                  <span className="forgot__pass__text">Forgot password?</span>
                </Link>
              </div>
            </div>
            <div className="register__button__block">
              <Link to={"/auth/register"} className="button register__button">
                <span className="button__text">Register</span>
              </Link>
            </div>
            <div className="login__button__block">
              <button
                disabled={disabled}
                className="button login__button"
                onClick={() => handleLogin()}
              >
                <span className="button__text">Sign in.</span>
              </button>
            </div>
            <div className="img">
              <img
                src={"./img/authbackground.svg"}
                className="img__background"
                alt="authbackground"
              />
            </div>
          </div>
        </>
      ) : (
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
