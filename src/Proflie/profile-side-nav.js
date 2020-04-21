import React from 'react'
import { ListItem, ListItemText, List }  from '@material-ui/core'
const SideNav = ({ friends }) => {

    return (
    <List disablePadding dense>
        <ListItem button>
        <ListItemText>Friends</ListItemText>
        {friends.map(friend => <ListItemText key={friend.id}>{friend.name}</ListItemText>)}
        </ListItem>
    </List>
    );
}

export default SideNav;