import React from 'react'
import { ListItem, ListItemText, List }  from '@material-ui/core'
const SideNav = () => {

    return (
    <List disablePadding dense>
        <ListItem button>
        <ListItemText>Home</ListItemText>
        </ListItem>
        <ListItem button>
        <ListItemText>Friends</ListItemText>
        </ListItem>
        <ListItem button>
        <ListItemText></ListItemText>
        </ListItem>
    </List>
    );
}

export default SideNav;