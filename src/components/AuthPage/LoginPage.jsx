import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  isUserStillValidFunction,
  loginExistingUserFunction,
} from "../../redux/actions/useractions";
import "./LoginPage_Style.scss";
import Loader from "../Loader/Loader";
import { useInput } from "../../Hooks/useInput/useInput";
import AuthButton from "../Attoms/AuthButton/AuthButton";
import LinkButton from "../Attoms/LinkButton/LinkButton";
import MyInput from "../Attoms/MyInput/MyInput";
import showIcon from "./../../assets/images/show.png";
import hideIcon from "./../../assets/images/hide.png";
import MyButton from "../Attoms/MyButton/MyButton";

function LoginPage() {
  const { isLoading, isError } = useSelector((state) => state.user);

  const nickname = useInput("", {
    isEmpty: true,
    minLength: 3,
  });
  const password = useInput("", {
    isEmpty: true,
    minLength: 4,
  });

  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const [disabled, setDisabled] = useState(true);
  const [isErrorWhileLogin, setIsErrorWhileLogin] = useState("");

  const [checkBox, setCheckBox] = useState(false);

  useEffect(() => {
    if (nickname.minLengthError || password.minLengthError) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [nickname.minLengthError, password.minLengthError]);

  const dispatch = useDispatch();

  function handleLogin() {
    dispatch(
      loginExistingUserFunction({
        username: nickname.value,
        password: password.value,
      })
    )
      .then((res) => setIsErrorWhileLogin(res.error.message))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    dispatch(isUserStillValidFunction());
  }, []);

  return (
    <div className="login__container">
      {!isLoading ? (
        <>
          <div className="login__form">
            <h1 className="text text__big">Sign in</h1>
            {isError && (
              <div className="error__while_login">{isErrorWhileLogin}</div>
            )}
            <span className="text text__small">Sign in to start chating!</span>
            <div className="login__nickname column">
              {nickname.isValueDirty && nickname.isEmpty && (
                <span className="is__error__in__nickname">
                  Nickname cannot be empty.
                </span>
              )}
              {nickname.minLengthError && !nickname.isEmpty && (
                <span className="is__error__in__nickname">
                  Nickname must be longer than 3 symbols.
                </span>
              )}
              <MyInput
                className={"input"}
                type={"text"}
                placeholder={"Type your login."}
                value={nickname.value}
                onChange={(e) => nickname.onChange(e)}
                onBlur={(e) => nickname.onBlur(e)}
              />
            </div>
            <div className="login__password column">
              {password.isValueDirty && password.isEmpty && (
                <span className="is__error__in__pasword">
                  Password cannot be empty.
                </span>
              )}
              {password.minLengthError && !password.isEmpty && (
                <span className="is__error__in__pasword">
                  Password must be longer than 4 symbols.
                </span>
              )}
              <div className="password__block column">
                <MyInput
                  className={"input"}
                  type={isPasswordShown ? "text" : "password"}
                  placeholder={"Type your password."}
                  value={password.value}
                  onChange={(e) => password.onChange(e)}
                  onBlur={(e) => password.onBlur(e)}
                />
                <img
                  onClick={() => setIsPasswordShown(!isPasswordShown)}
                  className="showpass__icon"
                  src={isPasswordShown ? hideIcon : showIcon}
                  alt="pass"
                />
              </div>
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
                <LinkButton
                  path={"#"}
                  className={"forgot__link"}
                  spanClassName={"forgot__pass__text"}
                  text={"Forgot password?"}
                />
              </div>
            </div>
            <div className="login__button__block">
              <AuthButton
                className={"button login__button"}
                onClick={() => handleLogin()}
                disabled={disabled}
                text={"Sign in."}
              />
            </div>
            <div className="register__button__block">
              <LinkButton
                className={"button register__button"}
                path={"/auth/register"}
                spanClassName={"button__text"}
                text={"Register"}
              />
            </div>

            <img
              src={"./img/authbackground.svg"}
              className="img__background"
              alt="authbackground"
            />
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default LoginPage;
