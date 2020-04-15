import React, { useState, useEffect } from 'react';
import { CloudinaryContext, Image } from "cloudinary-react";
import { fetchPhotos, openUploadWidget } from "./CloudinaryService";

// function for handling upload widget for cloudinary
function Upload() {
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
  <div className="Upload">
    <header className="Upload-header">
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

export default Upload;