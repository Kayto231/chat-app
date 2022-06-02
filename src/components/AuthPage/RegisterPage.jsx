import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { registerNewUserFunction } from "../../redux/actions/useractions";
import "./RegisterPage_Style.scss";
import { useInput } from "../../Hooks/useInput/useInput";
import MyInput from "../Attoms/MyInput/MyInput";
import LinkButton from "../Attoms/LinkButton/LinkButton";
import AuthButton from "../Attoms/AuthButton/AuthButton";
import MyButton from "../Attoms/MyButton/MyButton";

function RegisterPage() {
  const nickname = useInput("", {
    isEmpty: true,
    minLength: 3,
  });
  const password = useInput("", {
    isEmpty: true,
    minLength: 4,
  });

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (nickname.minLengthError || password.minLengthError) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [nickname.minLengthError, password.minLengthError]);

  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(
      registerNewUserFunction({
        username: nickname.value,
        password: password.value,
      })
    );
  };

  return (
    <div className="register__container">
      <div className="register__form">
        <h1 className="text text__big">Register</h1>
        <span className="text text__small">Sign in and start chatting!</span>
        <div className="register__nickname column">
          {nickname.isValueDirty && nickname.isEmpty && (
            <span className="is__error__in__nickname">
              Nickname cannot be empty.
            </span>
          )}
          {nickname.minLengthError && !nickname.isEmpty && (
            <span className="is__error in__nickname">
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
        <div className="register__password column">
          {password.isValueDirty && password.isEmpty && (
            <span className="is__error__in__pasword">
              Password cannot be empty.
            </span>
          )}
          {password.minLengthError && !password.isEmpty && (
            <span className="is__error in__pasword">
              Password must be longer than 5 symbols.
            </span>
          )}
          <MyInput
            className={"input"}
            type={"password"}
            placeholder={"Type your password."}
            value={password.value}
            onChange={(e) => password.onChange(e)}
            onBlur={(e) => password.onBlur(e)}
          />
        </div>
        <div className="register__button__block">
          <AuthButton
            className={"button register__button"}
            span={"button register__button"}
            onClick={() => handleLogin()}
            disabled={disabled}
            text={"Register"}
          />
          <LinkButton
            className={"button link__login"}
            path={"/auth/login"}
            spanClassName={"button__text"}
            text={"Login"}
          />
        </div>
        <img
          src={"./img/authbackground.svg"}
          className="img__background"
          alt="authbackground"
        />
      </div>
    </div>
  );
}

export default RegisterPage;
