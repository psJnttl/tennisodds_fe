import React from 'react';
import PropTypes from 'prop-types';
import PlayerList from './PlayersList';
import PlayerStatistics from './PlayerStatistics';

class TennisPlayers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showPlayerList: true, searchInputValue: "", selectedPlayer: ""}
    this.selectPlayer = this.selectPlayer.bind(this);
  }
  selectPlayer(item) {
    this.fetchPlayerStatistics(item.id);
    this.setState({searchInputValue: item.name});
  }
  filterBasedOnName() {
    return this.props.playerList.filter( item => {
      return item.name.toLowerCase().includes(this.state.searchInputValue.toLowerCase());
    });
  }
  render() {
    let filteredFullList = [];
    if (this.state.showPlayerList) {
      filteredFullList = this.filterBasedOnName();
    }
    return (
      <div>
        <PlayerStatistics
          playerStats={ this.state.playerStats}
        />
        <h5> TennisPlayer </h5>
        <PlayerList
          show={this.state.showPlayerList}
          list={filteredFullList}
          playerSelect={this.selectPlayer}
          selectedPlayer={this.state.selectedPlayer}
        />
      </div>
    );
  }
}

TennisPlayers.PropTypes = {
  playerList: PropTypes.array,
  getPlayerById: PropTypes.func.isRequired,
}
TennisPlayers.defaultProps = {
  playerList: [],
}
export default TennisPlayers;
