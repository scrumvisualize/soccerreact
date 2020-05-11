import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import App from './App';

const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/register' component={Register}></Route>
      <Route exact path='/login' component={Login}></Route>
  </Switch>
  );
}
export default Main;