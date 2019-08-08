import React, { Component } from "react";

class LoginSignUp extends Component {
  render() {
    return (
      <div className="login-signup-content">
        <div className="login-box">
          <form action="" className="auth-form auth-form--login">
            <h2 className="auth-form__title">Login</h2>
            <input
              type="email"
              className="auth-form__input"
              placeholder="Email"
            />
            <input
              type="password"
              className="auth-form__input"
              placeholder="Password"
            />
            <input
              type="password"
              className="auth-form__input auth-form__input--invisible"
              placeholder="Confirm password"
              disabled
            />
            <button className="btn btn-form auth-form__btn">Login</button>
          </form>
        </div>
        <div className="signup-box">
          <form action="" className="auth-form">
            <h2 className="auth-form__title">Sign Up</h2>
            <input
              type="email"
              className="auth-form__input"
              placeholder="Email"
            />
            <input
              type="password"
              className="auth-form__input"
              placeholder="Password"
            />
            <input
              type="password"
              className="auth-form__input"
              placeholder="Confirm password"
            />
            <button className="btn btn-form auth-form__btn">Sign Up</button>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginSignUp;
