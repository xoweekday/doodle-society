import React from 'react';

const Doodlefeed = ({ doods }) => (
    <div>
      {doods.map(dood => {
        console.log(doods);
          return (
            <div className="doodle-container">
            <img className="doodle" src={dood[0].url} />
            <img className="bg-img" src={dood[1]} />
            </div>
          )
        })}  
    </div>
)

export default Doodlefeed; 