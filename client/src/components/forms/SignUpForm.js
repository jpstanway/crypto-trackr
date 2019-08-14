import React, { Component } from "react";
import { graphql } from "react-apollo";
import mutation from "../../mutations/SignUp";
import AuthForm from "../forms/AuthForm";

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: []
    };
  }

  onSubmit({ email, password, password2 }) {
    this.props
      .mutate({
        variables: {
          email,
          password,
          password2
        }
      })
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({ errors });
      });
  }

  render() {
    return (
      <div className="signup-box">
        <AuthForm
          formName="Sign Up"
          disabled={false}
          errors={this.state.errors}
          onSubmit={this.onSubmit.bind(this)}
        />
      </div>
    );
  }
}

export default graphql(mutation)(SignUpForm);
