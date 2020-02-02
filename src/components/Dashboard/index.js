import React, { Component } from 'react'
import { connect } from 'react-redux'
import MenuAppBar from '../Navbar';
import Menu from '../Menu';
import jwt_decode from 'jwt-decode';
import Chat from '../Chat';
import io from 'socket.io-client'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        // this.socket = io('http://localhost:5000');
        this.socket = io('https://server---api.herokuapp.com');
        this.state = {
            usersList: [],
            chats: [],
            filteredChats: [],
            selectedUser: null
        };
        this.selectedUser = this.selectedUser.bind(this);
        let token = sessionStorage.getItem('token_');
        this.decoded = jwt_decode(token);
    }

    componentDidMount() {

        this.socket.on('connect', () => {
            console.log("Connected");
            this.socket.emit('send_userDetails', this.decoded);
        })

        this.socket.on('send_UsersList', (data) => {
            console.log('send_UsersList', data)
            this.setState({
                usersList: data.filter(item => item.userId !== this.decoded.userId)
            })
        })

        this.socket.on('incoming_msg', (data) => {
            let chats = [...this.state.chats, data];
            this.setState({
                chats
            }, () => {
                if (this.state.selectedUser) {
                    this.setState({
                        filteredChats: chats.filter(d => d.sender.userId === this.state.selectedUser.userId ||
                            d.receiver.userId === this.state.selectedUser.userId)
                    })
                }
            })
            console.log('incoming_msg', data)
        })

        this.socket.on('ack', (data) => {
            let chats = [...this.state.chats, data];
            this.setState({
                chats
            }, () => this.selectedUser(data.receiver))
        })

    }

    selectedUser = (item) => {
        let { chats } = this.state;
        let chatsMsg = chats.filter(d => (d.sender.userId === item.userId && d.receiver.userId === this.decoded.userId)
            || (d.sender.userId === this.decoded.userId && d.receiver.userId === item.userId))
        this.setState({
            selectedUser: item,
            filteredChats: chatsMsg
        })
    }

    render() {
        const { location: { pathname } } = this.props;
        console.log('Dashboard', this.props.history)
        return (
            <React.Fragment>
                <MenuAppBar {...this.props} io={io} />
                <Menu {...this.props} />
                {pathname === "/dashboard" && <div>Dashboard</div>}
                {pathname === "/chat" && <Chat socket={this.socket} selectedUser={this.selectedUser} chats={this.state.filteredChats} usersList={this.state.usersList} user={this.decoded ? this.decoded : null} />}
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        reducer: state.form,
        auth: state.auth,
        menu: state.menu
    }
}

export default connect(mapStateToProps)(Dashboard)
