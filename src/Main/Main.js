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
  return (
  <div className="Home">
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
    {/* <div> */}
      {doods.map(dood => {
          return (
            <div className="feed-doodle-container">
              {renderRedirect()}
            <img className="feed-doodle" src={dood[0].url} />
            <img className="feed-bg-image" src={dood[1]} />
            <LikeButton />
            <p align="justify"><font className="userName" onClick={() => 
              {
                setRedirect(true);
              }
              }>{user.name + ':'}</font></p>
            <p align="justify"><font className="caption">{dood[0].caption}</font></p>
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