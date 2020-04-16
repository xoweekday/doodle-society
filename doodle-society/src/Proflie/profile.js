import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import SideNav from './profile-side-nav.js';
import NormalImageFeed from './imagesfeed';
import Doodlefeed from './doodlefeed.js'


const Profile = ({imgs, user, getDoods, doods}) => {
  console.log(imgs, user, getDoods);
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
}

export default Profile;