import React from "react";

const LinkButton = ({ text, onClick }) => (
  <div className={`btn btn-back`}>
    <a href="#content" onClick={onClick}>
      {text}
    </a>
  </div>
);

export default LinkButton;
