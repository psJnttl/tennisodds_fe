import React from 'react';
import PropTypes from 'prop-types';
import PlayerList from './PlayersList';
import PlayerStatistics from './PlayerStatistics';
import axios from 'axios';
import _ from 'lodash';
import SelectDateRange from './SelectDateRange';
import SearchPlayer from './SearchPlayer';

class TennisPlayers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showPlayerList: true, searchInputValue: "", selectedPlayer: "", playerStats:{}, dateFrom: "", dateTo: ""}
    this.selectPlayer = this.selectPlayer.bind(this);
    this.fetchPlayerStatistics = this.fetchPlayerStatistics.bind(this);
    this.changeFrom = this.changeFrom.bind(this);
    this.changeTo = this.changeTo.bind(this);
    this.dateSet = this.dateSet.bind(this);
    this.fetchPlayerStatisticsWithDates = this.fetchPlayerStatisticsWithDates.bind(this);
    this.onSearchInputChange = this.onSearchInputChange.bind(this);
    this.radioButtonSelect = this.radioButtonSelect.bind(this);
  }
  selectPlayer(item) {
    this.fetchPlayerStatistics(item.id);
    this.setState({searchInputValue: item.name});
  }
  fetchPlayerStatistics(playerId) {
    this.setState({selectedPlayer: playerId});
    const self = this;
    axios.get('http://localhost:8081//statistics/player/' + playerId)
    .then(function (response) {
      self.storePlayerStatsToState(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  storePlayerStatsToState(data) {
    this.setState({playerStats: data})
    const fromAndToDates = _.pick(data, ['from', 'to']);
    this.setState({dateFrom: fromAndToDates.from});
    this.setState({dateTo: fromAndToDates.to});
  }

  changeFrom(e) {
    this.setState({dateFrom: e.target.value});
  }
  changeTo(e) {
    this.setState({dateTo: e.target.value});
  }
  dateSet() {
    const ready = new RegExp("^[0-9]{4}-[0-9]{2}-[0-9]{2}$");
    if (true === ready.test(this.state.dateFrom) && true === ready.test(this.state.dateTo) &&
        typeof this.state.selectedPlayer === 'number') {
         this.fetchPlayerStatisticsWithDates({"playerId": this.state.selectedPlayer, start: this.state.dateFrom, end: this.state.dateTo});
    }
  }
  fetchPlayerStatisticsWithDates(playerObj) {
    this.setState({selectedPlayer: playerObj.playerId});
    const self = this;
    axios.post('http://localhost:8081//statistics/player/', playerObj)
    .then(function (response) {
      self.storePlayerStatsToState(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onSearchInputChange(e) {
    this.setState({searchInputValue: e.target.value});
  }
  radioButtonSelect(e) {
    if (e.target.value === "auto") {
      this.setState({showPlayerList: false, selectedPlayer:""});
    }
    else if (e.target.value === "full") {
      this.setState({showPlayerList: true});
    }
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
        <SelectDateRange
          onChangeFrom={this.changeFrom}
          dateFrom={this.state.dateFrom}
          onChangeTo={this.changeTo}
          dateTo={this.state.dateTo}
          dateSet={this.dateSet}
        />
        <SearchPlayer
          name={this.state.searchInputValue}
          onChangeName={this.onSearchInputChange}
          onClick={this.radioButtonSelect}
          valueR={this.state.showPlayerList}
          playerList={this.props.playerList}
          fetchPlayerStatistics={this.fetchPlayerStatistics}
        />
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
