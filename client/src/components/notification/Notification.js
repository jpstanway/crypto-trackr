import React from "react";
import { connect } from "react-redux";

export const Notification = ({ notification }) => {
  const show = {
    display: notification ? "block" : "none"
  };

  return (
    <div style={show} className="notification">
      <p>{notification}</p>
    </div>
  );
};

const mapStateToProps = state => ({
  notification: state.notification
});

export default connect(mapStateToProps)(Notification);
