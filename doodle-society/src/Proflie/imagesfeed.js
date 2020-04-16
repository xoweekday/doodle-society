import React from 'react';
import {
  Link,
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Canvas from '../Canvas.js';


const NormalImageFeed = ({user, imgs, getDoods}) => {

  return (
    <div>
      <Router>
        <Switch>
          <Route
          path="/doodle"
          render={(props) => {
          return (
          <Canvas user={user} url={props.location.url} original_id={props.location.original_id} getDoods={props.location.getDoods} />
                )
              }}
              />
        </Switch>
      {imgs.map(img => {
          return (
            <Link to={{
              pathname: '/doodle',
              url: img.url,
              original_id: img.id,
              getDoods: getDoods
            }}>
          <img className="gallery-img" src={img.url} /></Link>
          )
        })}
        
        </Router>
    </div>
  )
}

export default NormalImageFeed;