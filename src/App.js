
import React, { useEffect, useState } from "react";
import './App.css';
import './CSSModules/home.css';
import './CSSModules/register.css';
import './CSSModules/login.css';
import './CSSModules/aboutus.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Aboutus from './components/Aboutus';
import Navigation from './components/Navigation';

var ReactDOM = require('react-dom');
const App = () => {

  // const componentDidMount = () => {
  //    //Call our fetch function below once the component mounts
  //   this.callBackendAPI()
  //   .then(res => this.setState({ data: res.express }))
  //   .catch(err => console.log(err));
  // }
  //   //Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  //   const callBackendAPI = async () => {
  //   const response = await fetch('/express_backend');
  //   const body = await response.json();

  //   if (response.status !== 200) {
  //     throw Error(body.message)
  //   }
  //   return body;
  // }; 
return (
      <BrowserRouter>
        <div>
          <Navigation />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/aboutus" component={Aboutus} />
          </Switch>
        </div>
      </BrowserRouter>
    )
}
ReactDOM.render(React.createElement(App, null), document.getElementById('root'));

export default App;

