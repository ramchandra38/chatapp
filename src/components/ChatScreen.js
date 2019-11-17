import React, { Component } from 'react'
import Chatkit from '@pusher/chatkit-client'
import MessageList from './MessageList'
import RoomList from './RoomList'
import SendMessageForm from './SendMessageForm'
import NewRoomForm from './NewRoomForm' 
import WhosOnlineList from './WhosOnlineList'

class ChatScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: {},
            currentRoom: {},
            messages: [],
            joinableRooms: [],
            joinedRooms: []
        }
        // binding events
        this.sendMessage = this.sendMessage.bind(this)
        this.sendTypingEvent = this.sendTypingEvent.bind(this)
        this.subscribeToRoom = this.subscribeToRoom.bind(this)
        this.getRooms = this.getRooms.bind(this)
    }

    // sendMessage
    sendMessage(text) {
        this.state.currentUser.sendMessage({
            text,
            roomId: this.state.currentRoom.id,
        })
    }

    // createRoom
    createRoom(name) {
        this.state.currentUser.createRoom({
            name
        })
            .then(currentRoom => this.subscribeToRoom(this.state.currentRoom.id))
            .catch(err => console.log(err))
    }

    // sendTypingEvent
    sendTypingEvent() {
        this.state.currentUser
            .isTypingIn({ roomId: this.state.currentRoom.id })
            .catch(error => console.error('error', error))
    }

    // Connect to Chatkit instance
    componentDidMount() {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator: 'v1:us1:97f6c5be-14c5-401d-a0ab-973b36851782',
            userId: this.props.currentUsername,
            tokenProvider: new Chatkit.TokenProvider({
                url: 'http://localhost:3001/authenticate',
            }),
        })
        chatManager
            .connect()
            .then(currentUser => {
                this.setState({ currentUser })
                this.getRooms()
            })
    }

    // getRooms
    getRooms() {
        this.state.currentUser.getJoinableRooms()
            .then(joinableRooms => {
                this.setState({
                    joinableRooms,
                    joinedRooms: this.state.currentUser.rooms
                })
            })
    }

    // subscribeToRoom
    subscribeToRoom(roomID) {
        this.setState({ messages: [] }) //added this line to clean up the state
        return this.state.currentUser.subscribeToRoom({
            roomId: roomID,
            messageLimit: 100,
            hooks: {
                onMessage: message => {
                    this.setState({
                        messages: [...this.state.messages, message],
                    })
                },
                 onPresenceChange: () => this.forceUpdate(),
            },
        })
            .then(currentRoom => {
                this.setState({ currentRoom })
                this.getRooms()
            })
            .catch(error => console.error('error', error))
    }


    render() {
        return (
            <div className="app">
                <WhosOnlineList
                    currentUser={this.state.currentUser}
                    users={this.state.currentRoom.users}
                />
                <RoomList
                    subscribeToRoom={this.subscribeToRoom}
                    rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
                    currentRoomId={this.state.currentRoom.id}
                />
                <MessageList
                    messages={this.state.messages}
                    currentRoomId={this.state.currentRoom.id}
                />
                <NewRoomForm onSubmit={this.createRoom.bind(this)} />
                <SendMessageForm
                    onSubmit={this.sendMessage}
                    onChange={this.sendTypingEvent}
                    disabled={!this.state.currentRoom.id}
                />
            </div>
        )

    }
}

export default ChatScreen