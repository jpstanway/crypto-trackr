import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import query from "../queries/CurrentUser";
import mutation from "../mutations/Login";
import AuthForm from "../forms/AuthForm";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: []
    };
  }

  onSubmit({ email, password }) {
    // this.props
    //   .mutate({
    //     variables: {
    //       email,
    //       password
    //     },
    //     refetchQueries: [{ query }]
    //   })
    //   .catch(res => {
    //     const errors = res.graphQLErrors.map(error => error.message);
    //     this.setState({ errors });
    //   });
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

export default withRouter(LoginForm);
