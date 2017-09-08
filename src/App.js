import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import {Table} from 'react-bootstrap';
import TennisPlayers from './components/TennisPlayers';

class App extends Component {
  constructor() {
    super();
    this.state = {playerList : []}
  }
  fetchPlayerListFromServer() {
    const self = this;
    axios.get('http://localhost:8081/api/players')
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
        <div>
          <Table>
            <tbody>
              <tr>
                <td>
                  <TennisPlayers
                    playerList={this.state.playerList}
                  />

                </td>
                <td>
                  <TennisPlayers
                    playerList={this.state.playerList}
                  />

                </td>
              </tr>
            </tbody>
          </Table>
        </div>
    );
  }
}

export default App;
