// Core
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Contacts } from './pages/contacts';
import { Login } from './pages/login';
import { Signup } from './pages/signup';

// Theme
import './theme/init';
import { Header } from './components/header';

const start = (
    <Router>
      <div>
        <Header />
        <Route exact path="/" component={Login} />
        <Route path="/contacts" component={Contacts} />
        <Route path="/signup" component={Signup} />
      </div>
    </Router>
);

ReactDOM.render(start, document.getElementById('app'));
