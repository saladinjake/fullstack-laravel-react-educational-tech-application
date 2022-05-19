
import React, { Component,Suspense, lazy } from 'react';
import { Switch, Route, Redirect ,   BrowserRouter as Router } from 'react-router-dom';

import ReactDOM from "react-dom";
import App from "./App";
import "./i18n";
import 'bootstrap/dist/css/bootstrap.min.css';
//import * as serviceWorker from "./serviceWorker";
import { Provider as Provisioner } from "react-redux";
import store from "./enterprise-admin/core/redux/store";

// import ScrollToTop from "./enterprise-admin/core/helpers/ScrollToTop";
import { Toaster } from "react-hot-toast";

ReactDOM.render(
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
        <Suspense fallback={<div>Loading</div>}>
            <Switch>

            <Provisioner store={store}>
                  <App />
            </Provisioner>
           </Switch>
        </Suspense>
 </Router>
  ,
  document.getElementById("root")
);

// serviceWorker.unregister();