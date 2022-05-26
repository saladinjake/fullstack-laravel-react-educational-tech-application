
import React, { Component,Suspense, lazy } from 'react';
import { Switch, Route, Redirect ,   BrowserRouter as Router } from 'react-router-dom';

import SuperAdminRoute from "../../core/adhocs/SuperAdminRoute";

// 
// // import { GlobalStyle } from "../../views/components/common/styles/global.js";
import CourseDetails from "../../views/screens/pages/courses/CourseDetails";
import LearnerProfiler from "../../views/screens/pages/profile/LearnerProfile";
import BusinessDetails from "../../views/screens/pages/courses/BusinessDetails";
import CertificateDetails from "../../views/screens/pages/courses/CertificateDetails";
// 
import InstructorProfiler from "../../views/screens/pages/profile/InstructorProfile";
// import PageNotFound from "../../views/screens/pages/404/PageNotFound";

import UpdateCategory from "../../views/screens/pages/profile/UpdateCategory";
import UpdateSubCategory from "../../views/screens/pages/profile/UpdateSubCategory";
import UpdateCertificate from "../../views/screens/pages/profile/UpdateCertificate";

//import CreateLearner from "../../views/screens/pages/dashboard/actions/CreateLearner"






const Dashboard = lazy(() => import('../../views/screens/pages/dashboard/Dashboard'));
const DashboardCourses = lazy(() => import('../../views/screens/pages/dashboard/DashboardCourses'));
const DashboardInstructors = lazy(() => import('../../views/screens/pages/dashboard/DashboardInstructors'));
const DashboardUsers = lazy(() => import('../../views/screens/pages/dashboard/DashboardLearners'));
const DashboardNotifications = lazy(() => import('../../views/screens/pages/dashboard/DashboardNotifications'));
const DashboardBusiness = lazy(() => import('../../views/screens/pages/dashboard/DashboardBusiness'));
const DashboardCertificates = lazy(() => import('../../views/screens/pages/dashboard/DashboardCertificates'));
const DashboardCategory = lazy(() => import('../../views/screens/pages/dashboard/DashboardCategory'));
const DashboardProgram = lazy(() => import('../../views/screens/pages/dashboard/DashboardProgram'));
const DashboardCoursesPayments = lazy(() => import('../../views/screens/pages/dashboard/DashboardCoursesPayments'));
const DashboardBundlesPayments = lazy(() => import('../../views/screens/pages/dashboard/DashboardBundlesPayments'));
const DashboardCoursesOrders = lazy(() => import('../../views/screens/pages/dashboard/DashboardCoursesOrders'));
const DashboardBundlesOrders = lazy(() => import('../../views/screens/pages/dashboard/DashboardBundlesOrders'));


//const BasicElements = lazy(() => import('../../views/screens/pages/form-elements/BasicElements'));
//const BasicTable = lazy(() => import('../../views/screens/pages/tables/BasicTable'));
const Error404 = lazy(() => import('../../views/screens/pages/error-pages/Error404'));
const Error500 = lazy(() => import('../../views/screens/pages/error-pages/Error500'));
const Login1 = lazy(() => import('../../views/screens/pages/user-pages/Login'));




class AppNavigator extends Component {
  render(){
  return (
    <>
    
              {/*auth pages    */}
             <Redirect from="/" to="/login" exact />
             <Route exact path="/login" component={ Login1 } />

             {/*overview listng and history pages**/}
             <SuperAdminRoute exact path="/admin/dashboard" component={ Dashboard } />
             <SuperAdminRoute exact path="/dashboard" component={ Dashboard } />
             <SuperAdminRoute exact path="/admin/dashboard/courses" component={ DashboardCourses } />
             <SuperAdminRoute exact path="/admin/dashboard/users" component={ DashboardUsers } />
             <SuperAdminRoute exact path="/admin/dashboard/instructors" component={ DashboardInstructors } />
             <SuperAdminRoute exact path="/admin/dashboard/notifications" component={ DashboardNotifications } />
             <SuperAdminRoute exact path="/admin/dashboard/business" component={ DashboardBusiness  } />
             <SuperAdminRoute exact path="/admin/dashboard/categories" component={ DashboardCategory} />
             <SuperAdminRoute exact path="/admin/dashboard/programs" component={ DashboardProgram } />
             <SuperAdminRoute exact path="/admin/dashboard/certificates" component={ DashboardCertificates } />

              <SuperAdminRoute  exact path={`${process.env.PUBLIC_URL + "/admin/dashboard/courses/:id"}`}  component={CourseDetails} />
              <SuperAdminRoute exact path="/admin/dashboard/learners/:id" component={LearnerProfiler}
              />
              <SuperAdminRoute exact path="/admin/dashboard/instructors/:id" component={InstructorProfiler}
              />
              <SuperAdminRoute exact path="/admin/dashboard/business/:id" component={BusinessDetails}
              />
              <SuperAdminRoute exact path="/admin/dashboard/category/:id" component={UpdateCategory}
              />
              <SuperAdminRoute exact path="/admin/dashboard/subcategory/:id" component={UpdateSubCategory}
              />
             
              <SuperAdminRoute exact path="/admin/dashboard/certificates/:id" component={CertificateDetails}
              />
              <SuperAdminRoute exact path="/admin/dashboard/certificates/update/:id" component={UpdateCertificate}
              />


             <SuperAdminRoute exact path="/admin/dashboard/payments/courses" component={DashboardCoursesPayments }
              />
              <SuperAdminRoute exact path="/admin/dashboard/payments/bundles" component={DashboardBundlesPayments}
              />
              <SuperAdminRoute exact path="/admin/dashboard/courses/orders" component={DashboardCoursesOrders}
              />
              <SuperAdminRoute exact path="/admin/dashboard/bundles/orders" component={DashboardBundlesOrders}
              />
             
             
            
            


             {/* <SuperAdminRoute path="/form-Elements/basic-elements" component={ BasicElements } /> */}
        
        
           

              

            

           


            

           


              {/*<SuperAdminRoute exact path="/admin/dashboard/create-course" component={CreateCourse}
              />

              <SuperAdminRoute exact path="/admin/dashboard/create-learner" component={CreateLearner} /> */}
*/}
              {/* <Route path="*" component={Error404} /> */}
              <Route path="/error-pages/error-404" component={ Error404 } />
             <Route path="/error-pages/error-500" component={ Error500 } />



        
        </> 
    );

      }
}

export default AppNavigator;
