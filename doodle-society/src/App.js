import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from "react-router-dom";

import axios from 'axios';
import './App.css';
import Login from './Login/log-in.js'
import Upload from './Upload';
import Canvas from './Canvas';
import Signin from './Login/sign-in.js'
import NavigationBar from './Nav/nav.js'
import Main from './Main/Main';
import { Layout } from "./Nav/navlayout.js";
import Profile from './Proflie/profile'


function App() {
  const [user, setUser] = useState({ id: null, name: 'Not logged in' });
  const [text, setText] = useState(user.name);
  const [imgs, setImgs] = useState([]);
  const [doods, setDoods] = useState([]);
  const getImgs = () => {
    axios.get(`/api/images/${user.id}`)
      .then((imgs) => {
        setImgs(imgs.data);
      })
      .catch(err => console.error(err));
  }

  const getDoods = () => {
    axios.get(`/api/doodles/${user.id}`)
      .then((doods) => {
        // setDoods(doods.data);
        doods = doods.data;
        Promise.all(doods.map((dood, i) => {
          return axios.get(`/api/originals/${dood.original_id}`)
            .then((img) => {
              doods[i] = [dood, img.data];
              console.log(doods);
            })
        }))
        .then(() => setDoods(doods));

      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    setText(user.name);
    if(user.id) {
      getImgs();
      getDoods();
    }
  }, [user]);

  return (
    <div className="App">
        <React.Fragment>
          <Router>
          <NavigationBar 
          imgs={imgs}
          /> 
            <Switch>
              <Route 
                exact path="/" 
                render={() => <Login setUser={setUser} />}
              />
              <Route
                path="/upload"
                render={() => <Upload user={user} getImgs={getImgs} setUser={setUser} />}
              />
                <Route path="/profile" render={ (props) => 
                <Profile 
                user={user}
                imgs={props.location.imgs}
                getDoods={getDoods}
                doods={doods}
                /> 
                } />
              <Route
                path="/doodle"
                render={(props) => {
                  return (
                <Canvas user={user} url={props.location.url} original_id={props.location.original_id} getDoods={props.location.getDoods} />
                )
              }}
              />
              <Route path="/home" component={Main} />
            </Switch>
          </Router>
        </React.Fragment>
    </div>
  );
}
export default App;
