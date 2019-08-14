import React, { Component } from "react";
import LoginForm from "../forms/LoginForm";
import SignUpForm from "../forms/SignUpForm";

class LoginSignUp extends Component {
  render() {
    return (
      <div className="login-signup-content">
        <LoginForm />
        <SignUpForm />
      </div>
    );
  }
}

export default LoginSignUp;
