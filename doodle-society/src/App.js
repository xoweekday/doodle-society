import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from "react-router-dom";

import axios from 'axios';
import './App.css';
import Login from './Login/log-in.js'
import Upload from './Upload';
import Canvas from './Canvas';


function App() {
  const [user, setUser] = useState({ id: null, name: 'Not logged in' });
  const [text, setText] = useState(user.name);
  const [imgs, setImgs] = useState([]);
  const [doods, setDoods] = useState([]);
  const getImgs = () => {
    axios.get(`/api/images/${user.id}`)
      .then((imgs) => {
        setImgs(imgs.data);
      })
      .catch(err => console.error(err));
  }

  const getDoods = () => {
    axios.get(`/api/doodles/${user.id}`)
      .then((doods) => {
        // setDoods(doods.data);
        doods = doods.data;
        Promise.all(doods.map((dood, i) => {
          return axios.get(`/api/originals/${dood.original_id}`)
            .then((img) => {
              doods[i] = [dood, img.data];
              console.log(doods);
            })
        }))
        .then(() => setDoods(doods));

      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    setText(user.name);
    if(user.id) {
      getImgs();
      getDoods();
    }
  }, [user]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{text}</h1>
        <React.Fragment>
          <Router>
            <Switch>
              <Route 
                exact path="/" 
                render={() => <Login setUser={setUser} />}
              />
              <Route
                path="/upload"
                render={() => <Upload user={user} getImgs={getImgs} setUser={setUser} />}
              />
              <Route
                path="/doodle"
                render={(props) => {
                  return (
                <Canvas user={user} url={props.location.url} original_id={props.location.original_id} getDoods={props.location.getDoods} />
                )
              }}
              />
            </Switch>
            {!!user.id && <Link to="/upload">upload</Link>}
            {!!user.id && <Link to="/">home</Link>}
            {imgs.map(img => {
          return (
            <Link to={{
              pathname: '/doodle',
              url: img.url,
              original_id: img.id,
              getDoods: getDoods
            }}><img className="gallery-img" src={img.url} /></Link>
          )
          })}
          </Router>
        </React.Fragment>
      </header>
        {doods.map(dood => {
          console.log('DOOOOD ', dood);
          return (
            <div className="doodle-container">
            <img className="doodle" src={dood[0].url} />
            <img className="bg-img" src={dood[1]} />
            </div>
          )
        })}  
    </div>
  );
}
export default App;
