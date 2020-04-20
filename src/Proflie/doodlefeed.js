import React from 'react';
const moment = require('moment');

const Doodlefeed = ({ doods, user }) => {
  return (
      <div>
        <div className="main">
        {doods[user.id] && doods[user.id].map(dood => {
          return (
            <div key={dood.id}>
              <div className="doodle-container">
                <p align="justify"><font size="3" color="black">{`#${dood.caption}`}</font></p>
                <img className="doodle" src={dood.url} alt="" />
                <img className="bg-img" src={dood.original_url} alt="" />
                <p align="justify"><font className="createdAt">{moment(dood.created_at).startOf('minute').fromNow()}</font></p>
              </div>
            </div>
           )
          })}  
         </div>
      </div>
  )

}

export default Doodlefeed; 