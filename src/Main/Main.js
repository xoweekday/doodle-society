import React, { useState } from 'react';
import './Main.css';

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

const Home = ({user, doods}) => (
  <div className="Home">
    <div class="header">
        <a href="#default" className="logo">Doodle Society</a>
          <div class="header-right">
            <a className="active" href="/Home">Home</a>
            {/* need to add user image somehow */}
            <a href="#signout">Sign Out</a> 
            <img class="example" onClick={() => {console.log(doods)}} src={user.imageurl} />
          </div>
      </div>
      <h2>Feed</h2>
      <div class="row">
        <div class="side">
      </div>
      <div class="main">
      {doods.map(dood => {
          return (
            <div class="feed-doodle-container">
            <img class="feed-doodle" src={dood[0].url} />
            <img class="feed-bg-image" src={dood[1]} />
            <LikeButton />
            <p align="justify"><font size="3" class="userName">{user.name}</font></p>
            <p align="justify"><font size="3" class="caption">{dood[0].caption}</font></p>
            </div>
          )
        })}  
      </div>
    </div>
    <body>
    </body>
  </div>

);
export default Home;