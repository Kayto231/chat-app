import React from "react";
import "./Loader_Style.scss";

const Loader = () => {
  return (
    <div className="lds-ripple">
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
