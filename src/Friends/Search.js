import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const Search = ({ user, getFriends }) => {

  const [search, setSearch] = useState('');
  const [result, setResult] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const handleChange = (e) => setSearch(e.target.value);

  const handleKey = (e) => {
    if(e.key === 'Enter') {
      axios.get(`/api/users/find/${search}`)
        .then(user => setResult(user.data));
    }
  }

  const renderRedirect = () => {
    if(redirect) {
      return <Redirect to='/profile' />
    }
  }

  const addFriend = () => {
    axios.post('/api/friends', { user_id: user.id, friend_id: result.id })
      .then(() => getFriends())
      .then(() => setRedirect(true))
      .catch(err => console.error(err));
  }

  return (
    <div>
      {renderRedirect()}
      <input type="text" onChange={handleChange} onKeyUp={handleKey} />
      {result && <p onClick={addFriend}>{result.name}</p>}
    </div>
  )
}


export default Search;