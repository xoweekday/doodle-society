import React from 'react';
import { Link } from 'react-router-dom'

const NormalImageFeed = ({imgs, getDoods}) => (
    <div>
      {imgs.map(img => (
            <Link to={{
              pathname: '/doodle',
              url: img.url,
              original_id: img.id,
              getDoods: getDoods
            }}>
              <img className="gallery-img" src={img.url} />
            </Link>
          )
        )
      }
        
  </div>
)

export default NormalImageFeed;