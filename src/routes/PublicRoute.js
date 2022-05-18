import React from "react";
import PropTypes from "prop-types";
import roleNavigation from "helper/roleNavigation";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PublicRoute = ({
  component: Component,
  auth: { user, isAuthenticated,user_roles },
  ...rest
}) => {
  let isLoggedIn = false;
  if (user && isAuthenticated) {
    isLoggedIn = true;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Redirect to={roleNavigation(user_roles[0].name)} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

PublicRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(PublicRoute);
