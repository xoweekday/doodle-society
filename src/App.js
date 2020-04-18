import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import ReactNotifications from 'react-notifications-component';
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
import Search from './Friends/Search';
import { setRef } from '@material-ui/core';


function App() {
  const [user, setUser] = useState({ id: null, name: 'Not logged in' });
  const [imgs, setImgs] = useState([]);
  const [doods, setDoods] = useState([]);
  const [friends, setFriends] = useState([]);
  const [bgImage, setBGImage] = useState('');

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

  const getFriends = () => {
    return axios.get(`/api/friends/${user.id}`)
      .then(results => {
        setFriends(results.data);
        })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    if(user.id) {
      getImgs();
      getDoods();
      getFriends();
    }
  }, [user]);

  

  return (
    <div className="App">
      <React.Fragment>
        <Router>
          <ReactNotifications/>
          <NavigationBar user={user} imgs={imgs} getFriends={getFriends} />
          <Switch>
            <Route exact path="/" render={() => <Login setUser={setUser} />} />
            <Route
              path="/upload"
              render={() => ( 
                <Upload user={user} getImgs={getImgs} setUser={setUser} />
              )}
            />
            <Route
              path="/profile"
              render={() => {
                return (
                <div>
                  <div className="imgheader">
                    <Row>
                      <Col>
                        <div></div>
                        <div><b>{user.name}</b></div>
                        <Image className="profileimgs" src={user.imageurl} rounded />
                        <div>{user.email}</div>
                        <div>{user.id !== null ? `Total Doods: ${doods.length}` : null}</div>
                      </Col>
                    </Row>
                  </div>
                  <SideNav friends={friends} />
                  <NormalImageFeed
                    imgs={imgs}
                    getDoods={getDoods}
                    user={user}
                  />
                  <Doodlefeed doods={doods} user={user}/>
                </div>
              )}}
            />
            <Route
              path="/doodle"
              render={(props) => {
                return (
                  <Canvas
                    user={user}
                    url={props.location.url}
                    original_id={props.location.original_id}
                    getDoods={props.location.getDoods}
                  />
                );
              }}
            />
          <Route
            path="/home"
            render={() => <Main user={user} imgs={imgs} getDoods={getDoods} doods={doods}/>}
            />
            <Route
              path="/search"
              render={() => <Search user={user} getFriends={getFriends} />}
            />
          </Switch>
        </Router>
      </React.Fragment>
    </div>
  );
}
export default App;
