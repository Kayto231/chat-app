import React from "react";
import { Link } from "react-router-dom";

const LinkButton = ({ path, className, spanClassName, text }) => {
  return (
    <Link to={path} className={className}>
      <span className={spanClassName}>{text}</span>
    </Link>
  );
};

export default LinkButton;
