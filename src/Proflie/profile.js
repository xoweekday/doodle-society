import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Link, withRouter, Switch } from "react-router-dom";
import SideNav from './profile-side-nav.js';
import NormalImageFeed from './imagesfeed';
import Doodlefeed from './doodlefeed.js'
import Canvas from '../Canvas';


const Profile = ({imgs, user, getDoods, doods, match, location}) => {
    return (
        <div>
          <Router>
            <Switch>
              <Route
                path="/profile"
                render={() => {
                  return (
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
                }} 
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
                      imgs={imgs}
                      doods={doods}
                    />
                  )
                }}
              />
            </Switch>
          </Router>
        </div>
    )
}

export default Profile;