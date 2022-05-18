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
import HomeTwo from "HomeTwo";
import PageNotFound from "pages/guests/404/PageNotFound"
import About from "pages/guests/about/About"
import Login from "pages/guests/account/Login"
import Register from "pages/guests/account/Register"
import InstructorRegister from "pages/guests/account/InstructorRegister"
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
          path={`${process.env.PUBLIC_URL + "/home-two"}`}
          component={HomeTwo}
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
          path={`${process.env.PUBLIC_URL + "/about"}`}
          component={About}
        />



        <Route
          path={`${process.env.PUBLIC_URL + "/instructors/register"}`}
          component={InstructorRegister}
        />
      </Switch>
    </Router>
  );
}

export default App;
