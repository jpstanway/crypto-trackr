import React, { Component } from "react";
import { graphql } from "react-apollo";
import mutation from "../../mutations/Login";
import AuthForm from "../forms/AuthForm";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: []
    };
  }

  onSubmit({ email, password }) {
    this.props
      .mutate({
        variables: {
          email,
          password
        }
      })
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({ errors });
      });
  }

  render() {
    return (
      <div className="login-box">
        <AuthForm
          formName="Login"
          disabled={true}
          errors={this.state.errors}
          onSubmit={this.onSubmit.bind(this)}
        />
      </div>
    );
  }
}

export default graphql(mutation)(LoginForm);
