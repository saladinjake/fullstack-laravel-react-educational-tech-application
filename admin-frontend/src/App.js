import React, { Component } from 'react';
import AppRoutes from "./enterprise-admin/core/routes/navigation";
import './App.scss';

import { withRouter } from 'react-router-dom';
import Navbar from './enterprise-admin/views/screens/components/shared/Navbar';
import Sidebar from './enterprise-admin/views/screens/components/shared/Sidebar';
import SettingsPanel from './enterprise-admin/views/screens/components/shared/SettingsPanel';
import Footer from './enterprise-admin/views/screens/components/shared/Footer';
import toast from "react-hot-toast"
import { persistenceCheckExistence ,currentUserInfo } from "./enterprise-admin/api/services/admin"

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login, logOut, setPrevPath } from "./enterprise-admin/core/redux/actions/authActions";

class AppEnterprise extends Component {
  state = {}

  ensureSecuredAdminAccess(){
  }

  

  existsUserAsAdmin(unidentifiedUser){
    if(unidentifiedUser){
      const {roles } = unidentifiedUser;
      roles.forEach(role =>{
        if(role.name == "SuperAdmin"){
          return true
        }else{
          return false
        }
      })
    }
    return false
  }

  kickOutAttempt(){
    //LOG OUT USER AND REDIRECT TO HOME PAGE
    console.log('get out')
    this.ensureSecuredAdminAccess()
  }

  componentDidMount() {
    this.onRouteChanged();
    let that = this;
    (async function checkAdminAccess() {
         try{
           let adminStillHasValidTokens = await persistenceCheckExistence();
           //console.log(verifiedLearners.data.data.data)
           //level 1 check mate
          // console.log(adminStillHasValidTokens?.data?.data);
           let userUnidentified = adminStillHasValidTokens?.data?.data;
           if("roles" in userUnidentified ){
             console.log(true)
             const {roles } = userUnidentified 
             const isAdmin = roles[0].name == 'SuperAdmin' ? true:  that.kickOutAttempt()
             // level 2 check mate
             if(!isAdmin){
               that.kickOutAttempt()
             }
             // user is within the office location premises
             if(!that.ensureUserIsWithInOfficeEnvironment() ){
               that.kickOutAttempt()
             }
             // level 3 other means of authentication
           }else{
            console.log(false)
            that.kickOutAttempt()
           }

         }catch(err){
           console.log(err)
           that.kickOutAttempt()
           toast.error(
             //err?.response?.data?.message
           "Authentication is required to proceed"  || `Your session has expired`
         );
   
         }
         //setLoading(false);
         that.setState({  loading:false})
    })();


  }
  render () {
    let navbarComponent = !this.state.isFullPageLayout ? <Navbar/> : '';
    let sidebarComponent = !this.state.isFullPageLayout ? <Sidebar/> : '';
    let SettingsPanelComponent = !this.state.isFullPageLayout ? <SettingsPanel/> : '';
    let footerComponent = !this.state.isFullPageLayout ? <Footer/> : '';
    return (
      <div className="container-scroller">
        { navbarComponent }
        <div className="container-fluid page-body-wrapper">
          { sidebarComponent }
          <div className="main-panel">
            <div className="content-wrapper">
              <AppRoutes/>
              { SettingsPanelComponent }
            </div>
            { footerComponent }
          </div>
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    console.log("ROUTE CHANGED");
    const { i18n } = this.props;
    const body = document.querySelector('body');
    if(this.props.location.pathname === '/layout/RtlLayout') {
      body.classList.add('rtl');
      i18n.changeLanguage('ar');
    }
    else {
      body.classList.remove('rtl')
   
    }
    window.scrollTo(0, 0);
    const fullPageLayoutRoutes = [
     
     '/error-pages/error-404', '/error-pages/error-500', 
     '/general-pages/landing-page',
     "/login"
     ];
    for ( let i = 0; i < fullPageLayoutRoutes.length; i++ ) {
      if (this.props.location.pathname === fullPageLayoutRoutes[i]) {
        this.setState({
          isFullPageLayout: true
        })
        document.querySelector('.page-body-wrapper').classList.add('full-page-wrapper');
        break;
      } else {
        this.setState({
          isFullPageLayout: false
        })
        document.querySelector('.page-body-wrapper').classList.remove('full-page-wrapper');
      }
    }
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