import React from 'react'
import { Link } from 'react-router-dom';
import { ListItem, ListItemText, List }  from '@material-ui/core'
const SideNav = ({ friends }) => {

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
    </List>
    );
}

export default SideNav;