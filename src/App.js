import React from "react";
import { 
  BrowserRouter as Router, 
  Switch, 
  Route 
} from "react-router-dom";

//import components - 
import ScrollToTop from "helper/ScrollToTop";
import { GlobalStyle } from "components/common/styles/global.js";



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
         
        <div>Hello router</div>
      </Switch>
    </Router>
  );
}

export default App;
