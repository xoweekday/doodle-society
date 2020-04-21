import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';

const Search = ({ user, getFriends }) => {

  const [search, setSearch] = useState('');
  const [result, setResult] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const handleChange = (e) => {
    setSearch(e.target.value);
    handleSearch();
  }

  const handleKey = (e) => {
    if(e.key === 'Enter') {
      handleSearch();
    }
  }

  const handleSearch = _.debounce(() => {
    axios.get(`/api/users/find/${search}`)
      .then(users => setResult(users.data));
  }, 500);

  const renderRedirect = () => {
    if(redirect) {
      return <Redirect to='/profile' />
    }
  }

  const addFriend = (friend) => {
    axios.post('/api/friends', { user_id: user.id, friend_id: friend.id })
      .then(() => getFriends())
      .then(() => setRedirect(true))
      .catch(err => console.error(err));
  }

  return (
    <div>
      {renderRedirect()}
      <div className="friendSearch">
      <i class="fa fa-search icon" aria-hidden="true"></i>
      <input class="input-field" type="text" placeholder="Find Friends" onChange={handleChange} onKeyUp={handleKey} />
      </div>
      {result && result.length > 0 && result.map(user => <p onClick={() => addFriend(user.id)}>{user.name}</p>)}
    </div>
  )
}


export default Search;