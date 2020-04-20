import React, { useState } from 'react';
import './Main.css';
import { Redirect } from 'react-router-dom';

const LikeButton = () => {
  const [toggleState, setToggleState] = useState("off");

  function toggle() {
    setToggleState(toggleState === "off" ? "on" : "off");
  }
  return <div className={`switch ${toggleState}`} onClick={toggle} />;
}

const signOut = () => {
  localStorage.removeItem('JWT_TOKEN');
}

const Home = ({user, doods }) => {
  const [ redirect, setRedirect]  = useState(false);

const renderRedirect = () => {
  if (redirect) {
    return <Redirect to='/profile' />
  }
}

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
    {renderRedirect()}
    <div class="header">
        <a className="logo">Feed</a>
          <div class="header-right">
            <img class="example" src={user.imageurl} />
          </div>
      </div>
      <div class="row">
        <div class="side">
      </div>
      <div class="main">
      {orderDoods().map(dood => {
          return (
            <div className="feed-doodle-container">
            <img className="feed-doodle" src={dood.url} />
            <img className="feed-bg-image" src={dood.original_url} />
            <LikeButton />
            <p align="justify"><font className="userName" onClick={() => 
              {
                setRedirect(true);
              }
              }>{dood.username + ':'}</font></p>
            <p align="justify"><font className="caption">{dood.caption}</font></p>
            </div>
          )
        })}  
      </div>
    </div>
    <body>
    </body>
  </div>

)};
export default Home;