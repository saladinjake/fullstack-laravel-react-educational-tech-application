import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

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
