import React, { Component } from 'react';
import './App.scss';

import { withRouter } from 'react-router-dom';
import toast from "react-hot-toast"

import PropTypes from "prop-types";
import { connect } from "react-redux";


class AppEnterprise extends Component {
  render () {
    return (
      <div className="container-scroller">
        Nav goes here
        <div className="container-fluid page-body-wrapper">
          Side bar goes here
          <div className="main-panel">
            <div className="content-wrapper">
              content goes here 
            </div>
           footer goes here
          </div>
        </div>
      </div>
    );
  }

  
}







const mapStateToProps = (state) => ({
  auth: state.auth,
});

const ApplicationWrapper  = connect(mapStateToProps, {
  login,
  setPrevPath,
  logOut,
})(AppEnterprise);

export default (withRouter(ApplicationWrapper));


//export default withRouter(AppQuestenceEnterprise)