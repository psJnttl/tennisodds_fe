import React from 'react';
import PropTypes from 'prop-types';

class PlayerList extends React.Component {

  render() {
    return (
      <div>
        PlayerList
      </div>
    );
  }

}
PlayerList.PropTypes = {
  show: PropTypes.bool,
  playerList: PropTypes.array,
  playerSelect: PropTypes.func.isRequired,
  selectedPlayer: PropTypes.number.isRequired,
}
PlayerList.defaultProps = {
  show: true,
  playerList: [],
}
export default PlayerList;
