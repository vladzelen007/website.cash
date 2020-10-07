import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Cookie from "js-cookie";

const PrivateRoute = ({ component: Component, ...rest}) => (
  <Route {...rest} render={props => (
    Cookie.get('token') ? (
      <Component {...props} />
    ) : (
      <Redirect 
        to={{
        pathname: "/register",
        state: { from: props.location }
        }}
      />
    )
  )} 
  />
);

export default PrivateRoute;