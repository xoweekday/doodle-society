import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from "react-router-dom";

import axios from 'axios';
import ReactDOM from 'react-dom';
import './App.css';
import Login from './Login/log-in.js'
import Signin from './Login/sign-in.js'
import Upload from './Upload';
import NavigationBar from './Nav/nav.js'
import { Layout } from "./Nav/navlayout.js";


function App() {
  const [user, setUser] = useState({ id: null, name: 'Not logged in' });
  const [text, setText] = useState(user.name);
  const [imgs, setImgs] = useState([]);
  const getImgs = () => {
    axios.get(`/api/images/${user.id}`)
      .then((imgs) => {
        console.log(imgs.data);
        setImgs(imgs.data);
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    console.log('user changed');
    setText(user.name);
    if(user.id) {
      getImgs();
    }
  }, [user]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{text}</h1>
        <React.Fragment>
          <Router>
            <Switch>
              <Route 
                exact path="/" 
                render={() => <Login setUser={setUser} />}
              />
              <Route
                path="/upload"
                render={() => <Upload user={user} getImgs={getImgs} setUser={setUser} />}
              />
            </Switch>
            {!!user.id && <Link to="/upload">upload</Link>}
          </Router>
        </React.Fragment>
      </header>
      <div>
        Your Images:
        {imgs.map(img => <img src={img.url} />)}
      </div>
    </div>
  );
}
export default App;
