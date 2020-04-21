import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import _ from 'lodash';

const Search = ({ user, getFriends, setFriends }) => {

  const [select, setSelect] = useState('');
  const [redirect, setRedirect] = useState(false);

  let handleSearch = (search) => {
    return new Promise(resolve => {
      axios.get(`/api/users/find/${search}`)
        .then(users => resolve(users.data.map(user => {
          return {
            value: user,
            label: user.name,
          }
        })));
    }) ;
  }


  const renderRedirect = () => {
    if(redirect) {
      return <Redirect to='/profile' />
    }
  }

  const addFriend = (friend) => {
    axios.post('/api/friends', { user_id: user.id, friend_id: friend.id })
      .then(() => {
        getFriends(user)
          .then(results => setFriends(results.data))
          .catch(err => console.error(err))
      })
      .then(() => setRedirect(true))
      .catch(err => console.error(err));
  }

  return (
    <div>
      {renderRedirect()}
      <AsyncSelect loadOptions={handleSearch} onChange={(e) => setSelect(e.value)}/>
      <button onClick={() => addFriend(select)}>Add</button>
    </div>
  )
}


export default Search;