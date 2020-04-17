import React from 'react';

const Doodlefeed = ({ doods, user }) => {
  return (
      <div>
        <div class="main">
        {doods.map(dood => {
          return (
            <div>
              <div class="fakeimg" style={{height: 200}} className="doodle-container">
              <p align="justify"><font size="3" color="black">{`#${dood[0].caption}`}</font></p>
              <img className="doodle" src={dood[0].url} />
              <img className="bg-img" src={dood[1]} />
              </div>
              </div>
            )
          })}  
          </div>
      </div>
  )

}

export default Doodlefeed; 