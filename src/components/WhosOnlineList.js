import React, { Component } from 'react'

class WhosOnlineList extends Component {
    renderUsers() {
        return (
            <div className="online-list">
            <ul>
            <h3>Users:</h3>
                {this.props.users.map((user, index) => {
                    if (user.id === this.props.currentUser.id) {
                        return (
                            <WhosOnlineListItem key={index} presenceState="online">
                            <span className="currentUser"> {user.name} (You)</span>   
              </WhosOnlineListItem>
                        )
                    }
                    return (
                        <WhosOnlineListItem key={index} presenceState={user.presence.state}>
                            {user.name}
                        </WhosOnlineListItem>
                    )
                })}
            </ul>
            </div>
        )
    }

    render() {
        if (this.props.users) {
            return this.renderUsers()
        } else {
            return <p>Loading...</p>
        }
    }
}

class WhosOnlineListItem extends Component {
    render() {
        return (
            <li >
            <div
          style={{
            backgroundColor:
              this.props.presenceState === 'online' ? '#539eff' : '#414756',
          }}
        />
                {this.props.children}
            </li>
        )
    }
}

export default WhosOnlineList