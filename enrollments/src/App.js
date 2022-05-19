import React from "react";
// import router to defined valid links
import { 
  BrowserRouter as Router, 
  Switch, 
  Route 
} from "react-router-dom";

//import components/helpers - 
import ScrollToTop from "enterprise-app/core/helpers/common/ScrollToTop";
import { GlobalStyle } from "enterprise-app/core/views/components/common/styles/global.js";


import HomeOne from "enterprise-app/core/views/pages/guests/HomeOne";
import PageNotFound from "enterprise-app/core/views/pages/guests/404/PageNotFound"
import Login from "enterprise-app/core/views/pages/guests/account/Login"
import Register from "enterprise-app/core/views/pages/guests/account/Register"
import InstructorRegister from "enterprise-app/core/views/pages/guests/account/InstructorRegister"
import CourseGrid from "enterprise-app/core/views/pages/guests/courses/CourseGrid";
import CourseDetails from "enterprise-app/core/views/pages/guests/courses/CourseDetails";

import Product from "enterprise-app/core/views/pages/students/shop/Products";
import ProductDetails from "enterprise-app/core/views/pages/students/shop/ProductDetails";
import Cart from "enterprise-app/core/views/pages/students/shop/Cart";
import Checkout from "enterprise-app/core/views/pages/students/checkout/Checkout";
import InstructorDashboard from "enterprise-app/core/views/pages/students/shop/InstructorDashboard";

//adhocs and auth guards against routes accessibility
import LearnersRoute from "enterprise-app/core/helpers/routes/LearnersRoute";
import InstructorsRoute from "enterprise-app/core/helpers/routes/InstructorsRoute";
import PublicRoute from "enterprise-app/core/helpers/routes/PublicRoute";

// notifier
import { 
  Toaster 
} from "react-hot-toast";


/*
*@companyName: EMS
*@Location : Lagos Nigeria
*@Author/Developer : juwa victor/saladinjake
*@AuthorsEmail : juwavictor@gmail.com
*@description: router outlets . defines known routes with authguards
*@params: NULL
*@usage: <App/>
*/

function App() {
  return (
    <Router>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "green",
              color: "#ffffff",
            },
          },
          error: {
            style: {
              background: "orangered",
              color: "#ffffff",
            },
          },
        }}
      />
      <GlobalStyle />
      <ScrollToTop />
      
      <Switch>
          <Route
          exact
          path={`${process.env.PUBLIC_URL + "/"}`}
          component={HomeOne}
        />
        <Route
          path={`${process.env.PUBLIC_URL + "/login"}`}
          component={Login}
        />
        <Route
          path={`${process.env.PUBLIC_URL + "/register"}`}
          component={Register}
        />
        <Route
          path={`${process.env.PUBLIC_URL + "/product-details"}`}
          component={ProductDetails}
        />
        <Route path={`${process.env.PUBLIC_URL + "/cart"}`} component={Cart} />
        <LearnersRoute exact path="/products" component={Product} />

        <LearnersRoute
          path={`${process.env.PUBLIC_URL + "/checkout"}`}
          component={Checkout}
        />
        <InstructorsRoute
          exact
          path="/instructor/dashboard"
          component={InstructorDashboard}
        />
        <Route
          path={`${process.env.PUBLIC_URL + "/instructors/register"}`}
          component={InstructorRegister}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/courses"}`}
          component={CourseGrid}
        />
        {/* <Route
          exact
          path={`${process.env.PUBLIC_URL + "/courses/:search"}`}
          component={CourseGrid}
        /> */}
        <Route exact path="/courses/category/:id" component={CourseGrid} />

        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/courses/:id"}`}
          component={CourseDetails}
        />
        
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
}

export default App;
