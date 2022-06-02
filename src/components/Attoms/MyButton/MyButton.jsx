import React from "react";
import "./MyButton_Style.scss";

const MyButton = ({ text, colors, disabled, onClick }) => {
  return (
    <button
      onClick={() => onClick()}
      disabled={disabled}
      colors={colors}
      className="myButton green"
    >
      {text}
    </button>
  );
};

export default MyButton;
