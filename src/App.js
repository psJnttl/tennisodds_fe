import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';

class App extends Component {
  constructor() {
    super();
    this.state = {playerList : []}
  }
  fetchPlayerListFromServer() {
    const self = this;
    axios.get('http://localhost:8081/players')
    .then(function (response, updatePlayers) {
      self.updatePlayers(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  updatePlayers(playerList) {
    const players = _.sortBy(playerList, [function(p) { return _.toLower(p.name) }]);
    this.setState({playerList: players});
  }

  componentWillMount() {
    this.fetchPlayerListFromServer();
  }
  render() {
    return (
      <div >
        <h5>Tennis odds front end.</h5>
      </div>
    );
  }
}

export default App;
