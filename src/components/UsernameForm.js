import React, { Component } from 'react'

class UsernameForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onSubmit(e) {
        e.preventDefault()
        this.props.onSubmit(this.state.username)
    }

    onChange(e) {
        this.setState({ username: e.target.value })
    }

    render() {
        return (
            <div>
                <div className="content">
                    <h2>What is your username?</h2>
                    <form onSubmit={this.onSubmit}>
                        <input
                            type="text" className="username"
                            placeholder="Your full name"
                            onChange={this.onChange}
                        /><br/>
                        <input type="submit" className="customButton" />
                    </form>
                </div>
            </div>
        )
    }
}

export default UsernameForm