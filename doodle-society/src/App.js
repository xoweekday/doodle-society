import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import axios from 'axios';
import './App.css';
import Login from './Login/log-in.js'
import Upload from './Upload';
import Canvas from './Canvas';
import NavigationBar from './Nav/nav.js'
import Main from './Main/Main';
import SideNav from './Proflie/profile-side-nav';
import NormalImageFeed from './Proflie/imagesfeed';
import Doodlefeed from './Proflie/doodlefeed';


function App() {
  const [user, setUser] = useState({ id: null, name: 'Not logged in' });
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
        doods = doods.data;
        Promise.all(doods.map((dood, i) => {
          return axios.get(`/api/originals/${dood.original_id}`)
            .then((img) => {
              doods[i] = [dood, img.data];
            })
        }))
        .then(() => setDoods(doods));

      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
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
              <Route
                path="/profile"
                render={() => (
                  <div>
                    <SideNav />
                    <img src={user.imageurl}></img>
                    <NormalImageFeed 
                      imgs={imgs}
                      getDoods={getDoods} 
                      user={user}        
                    />
                    <Doodlefeed 
                      doods={doods}
                    />
                  </div>
                  )
                } 
              />
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
