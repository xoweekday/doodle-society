import React from 'react';

const Doodlefeed = ({ doods, user }) => {
  return (
      <div>
        <div class="main">
        {doods[user.id] && doods[user.id].map(dood => {
          return (
            <div>
              <div className="doodle-container">
              <p align="justify"><font size="3" color="black">{`#${dood.caption}`}</font></p>
              <img className="doodle" src={dood.url} />
              <img className="bg-img" src={dood.original_url} />
              </div>
              </div>
            )
          })}  
          </div>
      </div>
  )

}

export default Doodlefeed; 