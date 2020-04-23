import React, { useState, useEffect } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import SideNav from './profile-side-nav.js';
import NormalImageFeed from './imagesfeed';
import Bio from './Bio';


const Profile = ({ user, doods, getImgs, getFriends, requests, allowEditBio, getAllDoods, allowDeletePicture }) => {
  const [imgs, setImgs] = useState([]);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    getImgs(user)
      .then((imgs) => setImgs(imgs.data))
    getFriends(user)
      .then((friends) => setFriends(friends.data));
  }, [getImgs, getFriends, user]);

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
        <Row>
          <Col>
            <Bio user={user} allowEditBio={allowEditBio} />
          </Col>
        </Row>
      </div>
      <SideNav
        user={user}
        friends={friends}
        requests={requests || null}
        getFriends={getFriends}
        setFriends={setFriends}
      />
      <NormalImageFeed
        imgs={imgs}
        user={user}
        doods={doods}
        getAllDoods={getAllDoods}
        allowDeletePicture={allowDeletePicture}
      />
      {/* <Doodlefeed doods={doods} user={user}/> */}
    </div>
  )
}

export default Profile;