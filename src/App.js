import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import cloneDeep from 'lodash/cloneDeep'
import Button from 'react-bootstrap/lib/Button'

export default class App extends Component {
    constructor(props) {
        super();
        this.state = {
            username: '',
            rounds: 0,
            score: 0,
            currentChoice: '',
            leaderboard: [],
            apiBase: 'https://bqg54h778e.execute-api.eu-central-1.amazonaws.com/prod/master/'
        }
        this.changeUsername = this.changeUsername.bind(this);
        this.fetchLeaderboard = this.fetchLeaderboard.bind(this);
        this.castChoice = this.castChoice.bind(this);
        setInterval(() => {
            this.fetchLeaderboard();
        }, 1000);
        this.fetchLeaderboard();
    }

    changeUsername(username) {
        console.log(username);
        let newState = cloneDeep(this.state);
        newState.username = username;
        this.setState(newState);
    }

    fetchLeaderboard() {
        fetch(this.state.apiBase + 'leaderboard')
            .then(result => result.json())
            .then(res => this.setLeaderboard(res.leaderboard))
    }

    setLeaderboard(leaderboard) {
        let newState = cloneDeep(this.state);
        newState.leaderboard = leaderboard;
        let userFromLeaderboard = this.getUserByUsername(this.state.username);
        if (userFromLeaderboard !== null) {
            if (userFromLeaderboard.rounds != this.state.rounds) {
                newState.currentChoice = '';
                newState.rounds = userFromLeaderboard.rounds;
                newState.score = userFromLeaderboard.kills;
            }
        }
        this.setState(newState);
    }

    castChoice(choice) {
        fetch(this.state.apiBase + this.state.username + '?action=' + choice, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        let newState = cloneDeep(this.state);
        newState.currentChoice = choice;
        this.setState(newState);
        this.fetchLeaderboard();
    }

    getUserByUsername(username) {
        let ourUser = null;
        this.state.leaderboard.forEach(function (user) {
            if (user.player === username) {
                ourUser = user;
            }
        }, this);
        return ourUser;
    }

    render() {
        return (<div>
            <h1>Rock, Paper, Scissors</h1>
            {'Current Round: ' + this.state.rounds}
            <br />
            {'Your Score: ' + this.state.score}
            <br />
            {'Your Username: ' + this.state.username}
            <br />
            {'Your current choice: ' + this.state.currentChoice}
            <br />
            <input onChange={(event) => { this.changeUsername(event.target.value) }} />
            <Button onClick={() => { this.fetchLeaderboard() }} >TEST LEADERBOARD</Button>
            <Button onClick={() => { this.castChoice('rock') }} >ROCK</Button>
            <Button onClick={() => { this.castChoice('paper') }} >PAPER</Button>
            <Button onClick={() => { this.castChoice('scissors') }} >SCISSORS</Button>
        </div>);
    }
}

ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div'))
);
