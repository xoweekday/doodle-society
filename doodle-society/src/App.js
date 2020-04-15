import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import axios from 'axios';
import './App.css';
import Login from './Login/log-in.js'
import Signin from './Login/sign-in.js'
import NavigationBar from './Nav/nav.js'
import { Layout } from "./Nav/navlayout.js";


function App() {
  const [text, setText] = useState('Welcome to Doodle');
  return (
    <div className="App">
      <header className="App-header">
        <h1>{text}</h1>
        <React.Fragment>
          <Router>
            <Switch>
              <Route exact path="/" component={Signin} />
              <Route path="/login" component={Login} />
            </Switch>
          </Router>
        </React.Fragment>
      </header>
    </div>
  );
}

export default App;
