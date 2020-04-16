import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import SideNav from './profile-side-nav.js';


const Profile = () => {

    return (
        <div>
          <SideNav />
        </div>
    )
}

export default Profile;