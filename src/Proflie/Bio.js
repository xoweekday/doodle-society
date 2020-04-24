import React, { useState, useEffect} from 'react';
import axios from 'axios';

const Bio = ({ user, allowEditBio }) => {
  const [bio, setBio] = useState('');
  const [loadBio, setLoad] = useState(false);
  const [editBio, setEditBio] = useState(false);
  const [fetch, setFetch] = useState();

  const getBio = () => {
    axios.get(`/api/bios/${user.id}`)
      .then((bio) => {
        setBio(bio.data);
        setLoad(true);
      })
      .catch(err => console.error(err)); 
  }

  const addBio = () => {
    axios.post('api/bios', {
      user_id: user.id,
      bio: document.getElementById('bio').value
    })
      .then(() => {
        setEditBio(false);
        getBio();
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    setLoad(false);
    if(fetch) {
      clearInterval(fetch);
    }
    getBio();
    setFetch(setInterval(getBio, 5000));
  }, [user]);

  return (
    <div>
      {loadBio && bio}
    {loadBio && allowEditBio && !editBio && <p><button onClick={() => setEditBio(!editBio)}>{!!bio && 'Edit Bio' || 'Add Bio'}</button></p>}
    {editBio && 
    <div>
    <p><textarea id="bio" /></p>
    <p><button onClick={addBio}>Save</button></p>
    </div>
    }
    </div>
  )

}

export default Bio;