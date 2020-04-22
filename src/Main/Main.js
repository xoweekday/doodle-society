import React, { useState } from 'react';
import './Main.css';
import { Link } from 'react-router-dom';
import Search from '../Friends/Search';
import { FaHeart } from 'react-icons/fa'
import { IconContext } from "react-icons";
import axios from 'axios';
const moment = require('moment');





const Home = ({user, doods, friends }) => {
  
  const toggleLike = (e) => {
    console.log(doods, user);
    (e.currentTarget.className.baseVal === 'clear-heart') ? e.currentTarget.className.baseVal = 'red-heart': e.currentTarget.className.baseVal = 'clear-heart';
  }

  // const addLikedDood = () => axios.post('/api/doodles/likes/:userId/:doodleId');
  
const orderDoods = () => {
  const allDoods = [];
  Object.values(doods).forEach(doodColl => {
    doodColl.forEach(dood => allDoods.push(dood));
  });
  allDoods.sort((a, b) => a.created_at > b.created_at ? -1 : 1);
  return allDoods;
}

  return (
  <div className="Home">
    <div className="header">
        {/* <div className="logo">Feed</div> */}
          {/* <div className="header-right"> */}
            <img className="example" src={user.imageurl} alt="" />
            {/* </div> */}
          {/* <div className="header-left"> */}
            <Search />
          {/* </div> */}
      </div>
      {/* <div className="row">
        <div className="side">
      </div> */}
      <div className="main">
      {orderDoods().map((dood, index) => {
          const doodler = dood.username === user.name ? user : 
          friends.filter(friend => friend.name === dood.username)[0];
          return (
            <div className="feed-doodle-container" key={dood.username + dood.id}>
              <img className="feed-doodle" src={dood.url} alt="" />
              <img className="feed-bg-image" src={dood.original_url} alt="" />
              <p align="justify">
                <Link className="userName" to={{
                  pathname: '/profile',
                  user: doodler,
                }}>
                  {dood.username + ':'}
                </Link>
              </p>
            <p align="justify"><font className="caption">{dood.caption}</font></p>
            <p align="justify"><font className="createdAt">{moment(dood.created_at).startOf('minute').fromNow()}</font></p>
            <div>
            <FaHeart size='2em'  className={`clear-heart`} onClick={toggleLike} /> 
            </div>
            </div>
          )
        })}  
      </div>
    </div>
  // </div>

)};
export default Home;