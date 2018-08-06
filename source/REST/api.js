import { getActionResource, getResource, TOKEN } from "./config";

export const login = async ({ email, password }) => fetch(getActionResource('user', 'login'), {
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
    email,
    password,
  }),
})
    .then(response => {
      if (response.ok && response.status === 200) return response.json();

      throw new Error('api exception');
    })
    .then(user => {
      auth.authenticate(user.data.token);
    })
    .catch(err => this.setState({ apiExceptions: [err.message] }));


export const createUser = async ({ firstName, lastName, email, password }) => fetch(getResource('user'), {
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
    firstName,
    lastName,
    email,
    password,
    invite: TOKEN,
  }),
})
    .then(response => {
      if (response.ok && response.status === 200) return response.json();

      throw new Error('api exception');
    })
    .then(user => {
      auth.authenticate(user.data.token);
    })
    .catch(err => this.setState({ apiExceptions: [err.message] }));

class Auth {
  isAuthenticated = false;
  token = null

  authenticate(token) {
    this.isAuthenticated = true
    this.token = token;
  }

  signout() {
    this.isAuthenticated = false
  }
}

export const auth = new Auth();
