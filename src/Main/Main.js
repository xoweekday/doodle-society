import React, { useState, useEffect } from 'react';
import './Main.css';
import { Link } from 'react-router-dom';
import Comments from '../Comments/CommentForm';
import Search from '../Friends/Search';
import { FaHeart } from 'react-icons/fa'
import { IconContext } from "react-icons";
import axios from 'axios';
import Upload from '../Upload';
const moment = require('moment');





const Home = ({user, doods, friends, getFriends, setFriends }) => {
  
  const [likedDoods, setLikedDoods] = useState([]);
  const [userId] = useState(user.id)

  const toggleLike = (e) => {
    (e.currentTarget.className.baseVal === 'clear-heart') ? e.currentTarget.className.baseVal = 'red-heart': e.currentTarget.className.baseVal = 'clear-heart';
  }

  const addLikedDood = (user_id, doodler_id) => axios.post(`/api/doodles/likes/${user_id}/${doodler_id}`);
  const unLikeDood = (user_id, doodler_id) => axios.patch(`/api/doodles/likes/${user_id}/${doodler_id}`)

  // const getLikedDoods = (user_id) => {
  //   return axios.get(`/api/doodles/likes/${user_id}`)
  //   .then((likedDoods) => {
  //     console.log(likedDoods)
  //     // setLikedDoods(likedDoods);
  //   })
  // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
      const response = await axios.get(`/api/doodles/likes/${userId}`)
    console.log(response);
    // setLikedDoods(result.data)
  }, [likedDoods])
  
  
  
  
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
    <div className="header text-left">
      <div className="flex-grid">
        <div className="well">
            <img className="col" src={user.imageurl} alt="" />
            <div className="col">{user.name}</div>
            </div>
            <Upload user={user} />
            </div>
            <div className="col"><Search
              user={user}
              friends={friends}
              getFriends={getFriends}
              setFriends={setFriends}
            />
          </div>
      </div>
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
                <div className='iconContainer'>
            <FaHeart size='2em' className={`clear-heart`} 
            onClick={(e) => { 
              toggleLike(e);
              e.currentTarget.className.baseVal === 'clear-heart' ?
              unLikeDood(user.id, dood.id) :
              addLikedDood(user.id, dood.id)
              getLikedDoods()
            }} /> 
                </div>
              </p>
            <p align="justify"><font className="caption">{dood.caption}</font></p>
            <p align="justify"><font className="createdAt">{moment(dood.created_at).startOf('minute').fromNow()}</font></p>
            <p align="justify"><font className="originalDoodle">
            <Link to={{
                pathname: '/doodle',
                url: dood.original_url,
                original_id: dood.original_id,
              }}>
              Doodle Original Image
              </Link>
              </font></p>
            <Comments dood={dood} user={user}/>
            </div>
          )
        })}
      </div>
  </div>

)};
export default Home;