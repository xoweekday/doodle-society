import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import axios from 'axios';
import ReactDOM from 'react-dom';
import './App.css';
import Login from './Login/log-in.js'
import Signin from './Login/sign-in.js'
import NavigationBar from './Nav/nav.js'
import { Layout } from "./Nav/navlayout.js";
import Profile from './Proflie/profile'


function App() {
  const [text, setText] = useState('Welcome to Doodle');
  return (
    <div className="App">
        <React.Fragment>
          <Router>
          <NavigationBar />
            <Switch>
              <Route exact path="/" component={Signin} />
              <Route path="/login" component={Login} />
              <Route path="/profile" component={Profile} />
            </Switch>
          </Router>
        </React.Fragment>
    </div>
  );
}
export default App;
