import React, { useState, useEffect } from 'react';
import { CloudinaryContext, Image } from "cloudinary-react";
import { fetchPhotos, openUploadWidget } from "./CloudinaryService";
import axios from 'axios';
import './App.css';

function App() {
  const [text, setText] = useState('hello');
  const [images, setImages] = useState([]);

  const beginUpload = tag => {
    const uploadOptions = {
      cloudName: 'dmxywbm74',
      tags: [tag, 'anImage'],
      uploadPreset: "xutz4j2r"
    };
    openUploadWidget(uploadOptions, (error, photos) => {
      if (!error) {
        console.log(photos);
        if(photos.event === 'success'){
          setImages([...images, photos.info.public_id])
        }
      } else {
        console.log(error);
      }
    })
  }
  useEffect( () => {
    fetchPhotos("image", setImages);
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <p>
          {text}
        </p>
        <button onClick={() => {
          axios.get('/api/doodle')
            .then((text) => {
              setText(text.data);
            })
        }}>change to doodle</button>
        <button onClick={() => {
          axios.get('/api/noodle')
            .then((text) => {
              setText(text.data);
            })
        }}>change to noodle</button>
        <button onClick={() => {
          const username = prompt('enter username');
          const fullname = prompt('enter full name');
          axios.post('/api/users', { username, fullname })
            .then(id => console.log(id.data))
            .catch(err => console.error(err));
        }}>new user</button>
         <CloudinaryContext cloudName='dmxywbm74'>
        <button onClick={() => beginUpload("image")}>Upload Image</button>
      <section>
        {images.map(i => <Image
              key={i}
              publicId={i}
              fetch-format="auto"
              quality="auto"
            />)}
      </section>
        </CloudinaryContext>
      </header>
    </div>
  );
}

export default App;
