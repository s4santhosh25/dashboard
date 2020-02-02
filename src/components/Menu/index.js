import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Home from '@material-ui/icons/Home';
import Textsms from '@material-ui/icons/Textsms';
import MailIcon from '@material-ui/icons/Mail';
import { menu } from "../../actions/menu";

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default function Menu(props) {
    const { menu: { open }, dispatch, history } = props;
    const classes = useStyles();

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation">
            <List>
                <ListItem button key={"Home"} onClick={() => { history.push('/dashboard'); dispatch(menu()) }}>
                    <ListItemIcon> <Home /></ListItemIcon>
                    <ListItemText primary={"Home"} />
                </ListItem>
                <ListItem button key={"Chat"} onClick={() => { history.push('/chat'); dispatch(menu()) }}>
                    <ListItemIcon> <Textsms /></ListItemIcon>
                    <ListItemText primary={"Chat"} />
                </ListItem>
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    // const fullList = side => (
    //     <div
    //         className={classes.fullList}
    //         role="presentation"
    //         onClick={toggleDrawer(side, false)}
    //         onKeyDown={toggleDrawer(side, false)}
    //     >
    //         <List>
    //             {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
    //                 <ListItem button key={text}>
    //                     <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
    //                     <ListItemText primary={text} />
    //                 </ListItem>
    //             ))}
    //         </List>
    //         <Divider />
    //         <List>
    //             {['All mail', 'Trash', 'Spam'].map((text, index) => (
    //                 <ListItem button key={text}>
    //                     <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
    //                     <ListItemText primary={text} />
    //                 </ListItem>
    //             ))}
    //         </List>
    //     </div>
    // );

    return (
        <div>
            <Drawer open={open} onClose={() => dispatch(menu())}>
                {sideList('left')}
            </Drawer>
        </div>
    );
}
