import React from "react";

const Notification = ({ notification }) => {
  const show = {
    display: notification ? "block" : "none"
  };

  return (
    <div style={show} className="notification">
      <p>{notification}</p>
    </div>
  );
};

export default Notification;
