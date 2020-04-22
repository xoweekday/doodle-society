import React from 'react'
import { Link } from 'react-router-dom';
import { ListItem, ListItemText, List }  from '@material-ui/core'
import axios from 'axios';
const SideNav = ({ user, friends, setFriends, getFriends, requests }) => {

    const addFriend = (friend) => {
        axios.post('/api/friends', { user_id: user.id, friend_id: friend.id })
          .then(() => {
            getFriends(user)
              .then(results => setFriends(results.data))
              .catch(err => console.error(err))
          });
      }

    return (
    <List disablePadding dense>
        <ListItem button>
        <ListItemText>Friends</ListItemText>
        {friends.map(friend => <ListItemText key={friend.id}>
            <Link className="userName" to={{
                  pathname: '/profile',
                  user: friend,
                }}>
            {friend.name}
            </Link>
        </ListItemText>)}
        </ListItem>
        <ListItem button>
            {!!requests && !!requests.length && <ListItemText>Friend Requests:</ListItemText>}
            {!!requests && 
            requests.map(request => <ListItemText key={request.id} onClick={() => addFriend(request)}>
                {request.name}
            </ListItemText>)}
        </ListItem>
    </List>
    );
}

export default SideNav;