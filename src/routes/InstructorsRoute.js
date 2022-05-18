import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const InstructorsRoute = ({
  component: Component,
  auth: { token, isAuthenticated, user, user_roles },
  ...rest
}) => {
  let isLoggedIn = false;
  if (token && isAuthenticated && user && user_roles[0].name === "Instructor") {
    isLoggedIn = true;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        !isLoggedIn ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};

InstructorsRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(InstructorsRoute);
