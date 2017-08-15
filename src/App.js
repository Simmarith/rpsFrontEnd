import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import cloneDeep from 'lodash/cloneDeep'

export default class App extends Component {
    constructor(props) {
        super();
        this.state = {
            username: ''
        }
        this.changeUsername = this.changeUsername.bind(this);
    }

    changeUsername(username) {
        console.log(username);
        let newState = cloneDeep(this.state);
        newState.username = username;
        this.setState(newState);
    }

    render() {
        return (<div>
            {this.state.username}
            <br />
            <input onChange={(event) => {this.changeUsername(event.target.value)}}/>
        </div>);
    }
}

ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div'))
);
