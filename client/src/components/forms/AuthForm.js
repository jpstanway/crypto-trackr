import React, { Component } from "react";

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password2: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    this.props.onSubmit(this.state);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { formName, disabled, errors } = this.props;

    return (
      <form onSubmit={this.onSubmit} className="auth-form">
        <h2 className="auth-form__title">{formName}</h2>
        <ul className="auth-form__errors">
          {errors.map(error => {
            return (
              <li key="error">
                <i className="fas fa-chevron-right" /> {error}
              </li>
            );
          })}
        </ul>
        <input
          type="email"
          name="email"
          className="auth-form__input"
          placeholder="Email"
          onChange={this.onChange}
        />
        <input
          type="password"
          name="password"
          className="auth-form__input"
          placeholder="Password"
          onChange={this.onChange}
        />
        <input
          type="password"
          name="password2"
          className={`auth-form__input ${
            disabled ? "auth-form__input--invisible" : ""
          }`}
          placeholder="Confirm password"
          disabled={disabled}
          onChange={this.onChange}
        />
        <button className="btn btn-form auth-form__btn">{formName}</button>
      </form>
    );
  }
}

export default AuthForm;
