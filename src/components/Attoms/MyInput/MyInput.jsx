import React from "react";

const MyInput = ({ className, type, placeholder, value, onChange, onBlur }) => {
  return (
    <input
      className={className}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e)}
      onBlur={(e) => onBlur(e)}
    />
  );
};

export default MyInput;
