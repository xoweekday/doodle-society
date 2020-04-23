import React from 'react';
import { useHistory } from "react-router-dom";
import { CloudinaryContext } from "cloudinary-react";
import { openUploadWidget } from "./CloudinaryService";
import axios from 'axios';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import Button from 'react-bootstrap/Button';

// function for handling upload widget for cloudinary
function Upload({ user }) {
  const history = useHistory();
  const options = {
    title: 'SUCCESS!',
    message: 'Photo successfully uploaded!',
    type: 'success',                         // 'default', 'success', 'info', 'warning'
    container: 'center',                // where to position the notifications
    animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
    animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
    dismiss: {
      duration: 1500 
    }
  };
  
  const beginUpload = tag => {
    const uploadOptions = {
      cloudName: 'dmxywbm74',
      tags: [tag, 'anImage'],
      uploadPreset: "wkyeuokl",
      cropping: 'true',
      croppingAspectRatio: 1,
      croppingCoordinatesMode: 'custom'
    };
    openUploadWidget(uploadOptions, (error, photos) => {
      if (!error) {
        Promise.all(photos.map((photo) => {
          return axios.post('/api/images', { url: photo.url, uploader_id: user.id })
        }))
        .then((response) => {
          // getImgs();
          setTimeout(function(){store.addNotification(options);},0);
          history.push('/profile');
          // window.alert("Photo successfully Uploaded");
        })
        .catch(err => console.error(err));
      } else {
        console.log(error);
      }
    })
  }

  return (
    <div className="Upload">
    {/* <h6><b>Upload your Photo here!</b></h6> */}
    <div className="Upload-header">
        <CloudinaryContext cloudName='dmxywbm74'>
          {/* <LinkContainer to="/profile" delay={5000}> */}
          <Button variant="info" onClick={() => {
          beginUpload("image");
        }}>Upload Image</Button>{' '}
        {/* </LinkContainer> */}
        </CloudinaryContext>
    </div>
  </div>
  );
}

export default Upload;