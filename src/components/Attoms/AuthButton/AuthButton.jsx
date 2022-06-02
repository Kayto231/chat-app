import React from "react";

const AuthButton = ({ className, disabled, onClick, text }) => {
  return (
    <button disabled={disabled} className={className} onClick={() => onClick()}>
      <span className="button__text">{text}</span>
    </button>
  );
};

export default AuthButton;
