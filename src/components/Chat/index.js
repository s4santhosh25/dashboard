import React, { Component, Fragment } from 'react'
import { Grid, Paper, TextField, Button, Tooltip } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

class Chat extends Component {

    constructor() {
        super();
        this.state = { selectedUser: null, chats: [] };
        this.selectedUser = this.selectedUser.bind(this);
        this.enter = this.enter.bind(this);
        console.log('chat-constructor')
    }

    selectedUser = (item) => {
        this.setState({
            selectedUser: item
        }, () => this.props.selectedUser(item));
    }

    // updateScroll = (id) => {
    //     var element = document.getElementById(id);
    //     element.scrollTop = element.scrollHeight;
    // }


    enter = (text) => {
        const { socket, user } = this.props;
        console.log('this.state.selectedUser', this.state.selectedUser);
        let private_msg = {
            sender: { ...user, msg: text },
            receiver: this.state.selectedUser
        };
        this.text.value = "";
        socket.emit('private_message', private_msg)
        console.log('enter', private_msg);
    }

    render() {
        let { chats, user } = this.props;
        console.log(chats)
        return (
            <Fragment>
                <Grid className="chat-container" container>
                    <Grid className="chat-menu" item xs={12} sm={12} md={12} lg={12}>
                        {!this.state.selectedUser && <Grid item >
                            <Paper className="menu-header" elevation={3}>
                                Users
                            </Paper>
                        </Grid>}
                        {!this.state.selectedUser && this.props.usersList.map((item) => (
                            <Grid item key={item.userId} onClick={() => this.selectedUser(item)}>
                                <Paper className={this.state.selectedUser === item ? "menu selected" : "menu"}>
                                    {item.name}
                                    <Tooltip title={item.online ? "Online" : "Offline"}>
                                        <div className={item.online ? "online-status online" : "online-status offline"} />
                                    </Tooltip>
                                </Paper>
                            </Grid>
                        ))}
                        {this.state.selectedUser && <Grid className="chat-dashboard" item xs={12} sm={12} md={12} lg={12}>
                            <div className="receiver-name">
                                <div className="back-arrow" onClick={() => this.setState({ selectedUser: null })}><ArrowBack /></div>
                                <div className="user-name">{this.state.selectedUser.name}</div>
                            </div>
                            <div className="message">
                                {chats.map((item, index) => (
                                    <React.Fragment key={index}>
                                        {user.userId === item.sender.userId && <div id={el => this['sender-' + index] = el} className="sender">{item.sender.msg}</div>}
                                        {user.userId !== item.sender.userId && <div id={el => this['receiver-' + index] = el} className="receiver" key={index}>{item.sender.msg}<span className="sender-name">{item.sender.name}</span></div>}
                                    </React.Fragment>
                                ))}
                            </div>
                        </Grid>}
                    </Grid>
                </Grid>
                {this.state.selectedUser && <Grid container className="chat-input-container">
                    <TextField inputRef={el => this.text = el} className="text-input" id="outlined-basic" label="Message" variant="outlined" />
                    <Button disabled={!this.state.selectedUser ? true : false} className="text-enter" variant="contained" color="primary" onClick={() => this.enter(this.text.value)}>Enter</Button>
                </Grid>}
            </Fragment >
        )
    }
}


export default Chat
