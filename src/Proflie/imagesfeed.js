import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import '../Proflie/imagefeed.css'
const moment = require('moment');


const NormalImageFeed = ({ imgs, user, doods }) => {
  return (
      <div className="profile-feed">
          <div className='normal-img' >
          <h3>Uploads</h3>
        <Carousel>
          {imgs.map(img => (
            <Carousel.Item>
          <div className='profile-img-container' key={img.id}>
              <Link to={{
                pathname: '/doodle',
                url: img.url,
                original_id: img.id,
              }}>
              <img className="gallery-img" src={img.url} alt="" />
              </Link>
        </div>
    </Carousel.Item>
      ))}
    </Carousel>
    </div>

    <div className='doodled-img'>
      <h3>Doodles</h3>
    <Carousel>
  {doods[user.id] && doods[user.id].map(dood => (
    <Carousel.Item>
      <div key={dood.id}>
        <div className="doodle-img-container">
          <p align="justify"><font size="3" color="black">{`#${dood.caption}`}</font></p>
          <img className="doodle" src={dood.url} alt="" />
          <img className="bg-img" src={dood.original_url} alt="" />
          <p align="justify"><font className="createdAt">{moment(dood.created_at).startOf('minute').fromNow()}</font></p>
        </div>
      </div>
    </Carousel.Item>
    ))}
  </Carousel>
  </div>
</div>
)
}
export default NormalImageFeed;