import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { GoogleLogout} from 'react-google-login';
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
  const [doods, setDoods] = useState({});
  const [doodsexp, setDoodsexp] = useState({});
  const [friends, setFriends] = useState([]);
  const [bgImage, setBGImage] = useState('');

  const getImgs = () => {
    axios.get(`/api/images/${user.id}`)
      .then((imgs) => {
        setImgs(imgs.data);
      })
      .catch(err => console.error(err));
  }

  const getDoods = (user) => {
    return axios.get(`/api/doodles/${user.id}`);
  }

  const getAllDoods = () => {
    const allUsers = [user].concat(friends);
    return Promise.all(allUsers.map(user => getDoods(user)))
      .then((allDoods) => {
        const doodsCopy = {...doods};
        allDoods
        .map(userDoods => userDoods.data)
        .forEach(userDoods => {
          if(userDoods.length) {
            doodsCopy[userDoods[0].doodler_id] = userDoods;
          }
        });
        setDoods(doodsCopy);
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
    getAllDoods();
  }, [friends]);

  useEffect(() => {
    if(user.id) {
      getImgs();
      getFriends();
    } else {
      setImgs([]);
      setDoods({});
      setFriends([]);
    }
  }, [user]);

  return (
    <div className="App">
      <React.Fragment>
        <Router>
          <ReactNotifications/>
          <NavigationBar user={user} imgs={imgs} getFriends={getFriends} setUser={setUser} />
          <Switch>
            <Route
            exact path="/"
            render={(props) => {
              const { back } = props.location
              if(!user.id) {
              return <Login setUser={setUser} />
              }
              if(!back) {
                return <Redirect to='/home' /> 
              }
              return <Redirect to={back} />
            }
            }
           />
            <Route
              path="/upload"
              render={() => {
                if(!user.id) {
                  return <Redirect to={{
                    pathname: '/',
                    back: '/upload'
                  }} />
                }
                return <Upload user={user} getImgs={getImgs} setUser={setUser} />
              }}
            />
            <Route
              path="/profile"
              render={() => {
                if(!user.id) {
                  return <Redirect to={{
                    pathname: '/',
                    back: '/profile'
                  }} />
                }

                return (
                
                <div>
                  <div className="imgheader">
                    <Row>
                      <Col>
                        <div></div>
                        <div><b>{user.name}</b></div>
                        <Image className="profileimgs" src={user.imageurl} rounded />
                        <div>{user.email}</div>
                        <div>{user.id !== null && doods[user.id] ? `Total Doods: ${doods[user.id].length}` : null}</div>
                      </Col>
                    </Row>
                  </div>
                  <SideNav friends={friends} />
                  <NormalImageFeed
                    imgs={imgs}
                    getAllDoods={getAllDoods}
                    user={user}
                  />
                  <Doodlefeed doods={doods} user={user}/>
                </div>
              )}}
            />
            <Route
              path="/doodle"
              render={(props) => {
                if(!user.id) {
                  return <Redirect to={{
                    pathname: '/',
                    back: '/doodle'
                  }} />
                }
                return (
                  <Canvas
                    user={user}
                    url={props.location.url}
                    original_id={props.location.original_id}
                    getAllDoods={props.location.getAllDoods}
                  />
                );
              }}
            />
          <Route
            path="/home"
            render={() => {
            if(!user.id) {
              return <Redirect to={{
                pathname: "/",
                back: "/home"
              }} />
            }
            return <Main user={user} imgs={imgs} doods={doods}/>
          }}
            />
            <Route
              path="/search"
              render={() => {
                if(!user.id) {
                  return <Redirect to={{
                    pathname: '/',
                    back: '/search'
                  }} />
                }
                return <Search user={user} getFriends={getFriends} />
            }}
            />
          </Switch>
        </Router>
      </React.Fragment>
    </div>
  );
}
export default App;
