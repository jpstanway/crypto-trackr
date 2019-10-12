import React, { Component } from "react";
import { graphql } from "react-apollo";
import getCurrentUser from "../../queries/getCurrentUser";
import Login from "../../mutations/Login";

class LoginSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;

    this.props
      .mutate({
        variables: {
          email,
          password
        },
        refetchQueries: [{ query: getCurrentUser }]
      })
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({ errors });
      });
  }

  render() {
    const { email, password, errors } = this.state;
    return (
      <div className="login-signup-content">
        <form onSubmit={this.onSubmit} className="auth-form">
          <h2 className="auth-form__title">Login</h2>
          <ul className="auth-form__errors">
            {errors.map(error => {
              return (
                <li key={error}>
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
            value={email}
          />
          <input
            type="password"
            name="password"
            className="auth-form__input"
            placeholder="Password"
            onChange={this.onChange}
            value={password}
          />
          <input
            type="password"
            name="password2"
            className="auth-form__input auth-form__input--invisible"
            placeholder="Confirm password"
            disabled
            // onChange={this.onChange}
            // value={this.state.password2}
          />
          <button className="btn btn-form auth-form__btn">Login</button>
        </form>
      </div>
    );
  }
}

export default graphql(getCurrentUser)(graphql(Login)(LoginSignUp));
