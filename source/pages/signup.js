import React from 'react';
import './styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { getEmailException, getNameException, validate } from "../instruments";
import { Errors } from '../components/errors';
import { getResource, TOKEN } from '../REST/config';

export class Signup extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    firstNameExceptions: [],
    lastNameExceptions: [],
    emailExceptions: [],
    passwordExceptions: [],
    apiExceptions: [],
  };

  getExceptions = () => [
    ...this.state.firstNameExceptions,
    ...this.state.lastNameExceptions,
    ...this.state.emailExceptions,
    ...this.state.passwordExceptions,
  ];

  handleChangeEmail = ({ currentTarget }) =>
      this.setState({ email: currentTarget.value });

  handleChangePassword = ({ currentTarget }) =>
      this.setState({ password: currentTarget.value });

  handleChangeFirstName = ({ currentTarget }) =>
      this.setState({ firstName: currentTarget.value });

  handleChangeLastName = ({ currentTarget }) =>
      this.setState({ lastName: currentTarget.value });

  createUser = async () => {
    return fetch(getResource('user'), {
      method: 'POST',
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        invite: TOKEN,
      }),
    })
        .then(response => {
          if (response.ok) return console.log('redirect');

          this.setState({ apiExceptions: ['Api exception'] })
        })
        .catch(err => this.setState({ apiExceptions: [err.message] }));
  }

  handleClickSignup = async () => {
    this.setState(
        ({ email, password, firstName, lastName }) => ({
          firstNameExceptions: validate([getNameException], firstName),
          lastNameExceptions: validate([getNameException], lastName),
          emailExceptions: validate(
              [getNameException, getEmailException],
              email
          ),
          passwordExceptions: validate([getNameException], password)
        }),
        () => this.getExceptions().length === 0 && this.createUser(),
    );
  };

  render() {
    return (
        <div className="main">
          <Paper elevation={1}>
            <div className="login-body">
              <div className="input">
                <TextField
                    error={this.state.firstNameExceptions.length > 0}
                    id="firstname"
                    label="First Name"
                    margin="normal"
                    onChange={this.handleChangeFirstName}
                    value={this.state.firstName}
                />
                <Errors errors={this.state.firstNameExceptions} />
              </div>
              <div className="input">
                <TextField
                    error={this.state.lastNameExceptions.length > 0}
                    id="lastname"
                    label="Last Name"
                    margin="normal"
                    onChange={this.handleChangeLastName}
                    value={this.state.lastName}
                />
                <Errors errors={this.state.lastNameExceptions} />
              </div>
              <div className="input">
                <TextField
                    error={this.state.emailExceptions.length > 0}
                    id="email"
                    label="Email"
                    margin="normal"
                    onChange={this.handleChangeEmail}
                    value={this.state.email}
                />
                <Errors errors={this.state.emailExceptions} />
              </div>
              <div className="input">
                <TextField
                    error={this.state.passwordExceptions.length > 0}
                    id="pass"
                    label="Password"
                    margin="normal"
                    type="password"
                    onChange={this.handleChangePassword}
                    value={this.state.password}
                />
                <Errors errors={this.state.passwordExceptions} />
              </div>

              <Button variant="contained" size="large" color="primary" onClick={this.handleClickSignup}>
                Sign up
              </Button>
              <Errors errors={this.state.apiExceptions} />
            </div>
          </Paper>
        </div>
    )
  }
}
