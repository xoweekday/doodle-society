import React from 'react';
import {
  Link,
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Canvas from '../Canvas.js';

const Doodlefeed = ({ doods }) => {

  return (
    <div>
      {doods.map(dood => {
          return (
            <div className="doodle-container">
            <img className="doodle" src={dood[0].url} />
            <img className="bg-img" src={dood[1]} />
            </div>
          )
        })}  
    </div>
  )
}

export default Doodlefeed; 