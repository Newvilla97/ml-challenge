import React from "react";
import logoLupa from "../../img/lupaError.png";
import "./Error.css";
const Error = () => {
  return (
    <div className="dont-search-container">
      <div>
        <img className="img-error" src={logoLupa} alt="logo"></img>
      </div>
      <div className="text-error">
        No hemos podido encontrar este producto :(
      </div>
      <div></div>
    </div>
  );
};
export default Error;
