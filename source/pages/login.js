import React from "react";
import "./styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { withRouter } from "react-router-dom";
import { validate, getEmailException, getNameException } from '../instruments';
import { Errors } from '../components/errors';
import { login } from "../REST/api";

class LoginComponent extends React.Component {
  state = {
    email: "",
    password: "",
    emailExceptions: [],
    passwordExceptions: [],
    apiExceptions: [],
  };

  getExceptions = () => [
    ...this.state.emailExceptions,
    ...this.state.passwordExceptions,
  ];

  handleChangeEmail = ({ currentTarget }) =>
    this.setState({ email: currentTarget.value });

  handleChangePassword = ({ currentTarget }) =>
    this.setState({ password: currentTarget.value });

  login = async () => {
    if (this.getExceptions().length === 0) {
      await login(this.state);
      this.props.history.push({ pathname: '/' });
    }
  }

  handleClickLogin = async () => {
    this.setState(
      ({ email, password }) => ({
        emailExceptions: validate(
          [getNameException, getEmailException],
          email
        ),
        passwordExceptions: validate([getNameException], password)
      }),
      this.login,
    );
  };

  render() {
    return (
      <div className="main">
        <Paper elevation={1}>
          <div className="login-body">
            <div className="input">
              <TextField
                error={this.state.emailExceptions.length !== 0}
                value={this.state.email}
                id="email"
                label="Email"
                margin="normal"
                onChange={this.handleChangeEmail}
              />
              <Errors errors={this.state.emailExceptions} />
            </div>
            <div className="input">
              <TextField
                error={this.state.passwordExceptions.length !== 0}
                value={this.state.password}
                id="password"
                label="Password"
                type="password"
                margin="normal"
                onChange={this.handleChangePassword}
              />
              <Errors errors={this.state.passwordExceptions} />
            </div>

            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={this.handleClickLogin}
            >
              Login
            </Button>
          </div>
        </Paper>
      </div>
    );
  }
}

export const Login = withRouter(LoginComponent);
