import React, { useState } from 'react';
import "./App.css";
import "./CSSModules/home.css";
import "./CSSModules/register.css";
import "./CSSModules/login.css";
import "./CSSModules/aboutus.css";
import "./CSSModules/errorpage.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Aboutus from "./components/Aboutus";
import Navigation from "./components/Navigation";
import Profile from "./components/Profile";
import ErrorPage from "./components/ErrorPage";
import { ProtectedRoute } from "./components/protected.route";
import UserProfileProvider from './components/UserProfileProvider.js';

var ReactDOM = require("react-dom");

// const App = () => (
//   <BrowserRouter>
//     <>
//       <Navigation />
//       <Switch>
//         <ProtectedRoute exact path="/" component={Home} />
//         <ProtectedRoute path="/profile" component={Profile} />
//         <ProtectedRoute path="/aboutus" component={Aboutus} />
//         <Route path="/register" component={Register} />
//         <Route path="/login" component={Login} />
//       </Switch>
//     </>
//   </BrowserRouter>
// );

const App = () => {

  return (
  <BrowserRouter>
    <UserProfileProvider>
          <>
        <Navigation />
          <Switch>
              <ProtectedRoute exact path="/" component={Home} />
              <ProtectedRoute path="/profile" component={Profile} />
              <ProtectedRoute path="/aboutus" component={Aboutus} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route exact path="*" component={ErrorPage} />
          </Switch>
          </>
      </UserProfileProvider>
   </BrowserRouter>
  );
};
ReactDOM.render(
  React.createElement(App, null),
  document.getElementById("root")
);

export default App;
