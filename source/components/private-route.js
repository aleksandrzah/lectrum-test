import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { auth } from '../REST/api';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        auth.isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
);
