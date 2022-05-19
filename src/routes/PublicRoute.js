import React from "react";
import PropTypes from "prop-types";
import roleNavigation from "helper/roleNavigator";
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
*@usage: <PublicRoute
          exact
          path={`${process.env.PUBLIC_URL + "/login"}`}
          component={Login}
        />
*/
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
