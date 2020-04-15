import React, { useState, useEffect } from 'react';
import { CloudinaryContext, Image } from "cloudinary-react";
import { fetchPhotos, openUploadWidget } from "./CloudinaryService";
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Login from './Login/log-in';

// function for handling upload widget for cloudinary
function Upload(props) {
  const { user, getImgs, setUser } = props;
  const [images, setImages] = useState([]);

  const beginUpload = tag => {
    const uploadOptions = {
      cloudName: 'dmxywbm74',
      tags: [tag, 'anImage'],
      uploadPreset: "xutz4j2r"
    };
    openUploadWidget(uploadOptions, (error, photos) => {
      if (!error) {
        Promise.all(photos.map((photo) => {
          return axios.post('/api/images', { url: photo.url, uploader_id: user.id })
        }))
        .then((response) => {
          console.log('response ', response.data);
          getImgs();
        })
        .catch(err => console.error(err));
      } else {
        console.log(error);
      }
    })
  }

  return (
  <div className="Upload">
    <header className="Upload-header">
        <CloudinaryContext cloudName='dmxywbm74'>
        <button onClick={() => beginUpload("image")}>Upload Image</button>
        </CloudinaryContext>
        <Router>
          <Switch>
              <Route 
                exact path="/" 
                render={() => <Login setUser={setUser} />}
              />
          </Switch>
          <Link to="/">home</Link>
        </Router>
    </header>
  </div>
  );
}

export default Upload;