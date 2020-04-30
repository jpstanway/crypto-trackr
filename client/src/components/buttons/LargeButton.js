import React from "react";

const LargeButton = ({ text, onClick, classes, disabled }) => (
  <button
    onClick={onClick}
    className={`btn btn-large ${disabled ? "btn-disabled" : ""}`}
    disabled={disabled}
  >
    {text}
  </button>
);

export default LargeButton;
