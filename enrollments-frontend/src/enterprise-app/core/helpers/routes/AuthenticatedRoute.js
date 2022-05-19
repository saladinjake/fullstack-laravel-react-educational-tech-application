import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

/*
*@companyName: EMS
*@Location : Lagos Nigeria
*@Author/Developer : juwa victor/saladinjake
*@AuthorsEmail : juwavictor@gmail.com
*@description: api request to perform token authourization
*@params: object ReactComponent
* @params: object auth
* @params: object ...rest
*@usage: <AuthenticatedRoute
          exact
          path={`${process.env.PUBLIC_URL + "/login"}`}
          component={Login}
        />
*/
const AuthenticatedRoute = ({
  component: Component,
  auth: { token, isAuthenticated },
  ...rest
}) => {
  let isLoggedIn = false;
  if (token && isAuthenticated) {
    isLoggedIn = true;
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        return isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
};

AuthenticatedRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(AuthenticatedRoute);
