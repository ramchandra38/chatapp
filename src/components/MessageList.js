import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Message from './Message'

class MessagesList extends Component {
    componentDidUpdate() {
        const node = ReactDOM.findDOMNode(this);
        node.scrollTop = node.scrollHeight
    }
    render() {
        if (!this.props.currentRoomId) {
            return (
                <div className="message-list">
                    <div className="join-room">
                        &larr; Join a room!
                    </div>
                </div>
            )
        }
        return (
            <div className="message-list">
                {this.props.messages.map((message, index) => (
                    <Message key={index} username={message.senderId} text={message.text} />
                ))}
            </div>
        )
    }
}

export default MessagesList