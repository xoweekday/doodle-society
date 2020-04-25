import React, { useEffect, useState, useCallback } from 'react';
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";


const PhotoGallery = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  // const [photo, setPhotos] = useState(likedDoods);
  
  
  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);
  
  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };
  
  // const photos = (likedDoods) => {
  //   return likedDoods.map((dood) => {
  //     return {
  //       src: dood.url,
  //       width: 1,
  //       height: 1,
  //     }
  //   })
  // }

    // console.log(photo)
  // useEffect(() => {
  //   photo.map((dood) => {
  //     return {
  //       src: dood.url,
  //       width: 1,
  //       height: 1,
  //     }
  //   })
  // }, [photo])

  return (
    <div>
      <h1>hi</h1>
      <Gallery photos={photo}  onClick={openLightbox}/>
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photo.map(x => ({
                ...x,
                srcset: x.count,
                caption: x.caption,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway> 
    </div>
  );
}

export default PhotoGallery;
