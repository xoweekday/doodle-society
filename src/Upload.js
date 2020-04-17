import React from 'react';
import { Link, BrowserRouter as Router, Route, } from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import { CloudinaryContext } from "cloudinary-react";
import { openUploadWidget } from "./CloudinaryService";
import axios from 'axios';

// function for handling upload widget for cloudinary
function Upload(props) {
  const { user, getImgs } = props;

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
          getImgs();
          window.alert("Photo Uploaded!")
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
    </header>
  </div>
  );
}

export default Upload;