import React from "react";
import { 
  BrowserRouter as Router, 
  Switch, 
  Route 
} from "react-router-dom";

//import components - 
import ScrollToTop from "helper/ScrollToTop";
import { GlobalStyle } from "components/common/styles/global.js";

import HomeOne from "HomeOne";
import PageNotFound from "pages/guests/404/PageNotFound"

import Login from "pages/guests/account/Login"
import Register from "pages/guests/account/Register"
import InstructorRegister from "pages/guests/account/InstructorRegister"

import CourseGrid from "pages/guests/courses/CourseGrid";
import CourseDetails from "pages/guests/courses/CourseDetails";


import Product from "pages/students/shop/Products";
import ProductDetails from "pages/students/shop/ProductDetails";
import Cart from "pages/students/shop/Cart";
import Checkout from "pages/students/checkout/Checkout";

import InstructorDashboard from "pages/students/shop/InstructorDashboard";


//adhocs
import LearnersRoute from "routes/LearnersRoute";
import InstructorsRoute from "routes/InstructorsRoute";
import PublicRoute from "routes/PublicRoute";




import { 
  Toaster 
} from "react-hot-toast";


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
