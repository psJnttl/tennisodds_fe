import React from 'react';
import PropTypes from 'prop-types';

class PlayerRow extends React.Component {
  constructor() {
    super();
    this.state = {}
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onMouseEnter(id) {
    this.setState({mouseOver: id});
  }

  onMouseLeave() {
    this.setState({mouseOver: ''});

  }

  selectStyle(item) {
    if (this.props.selectedPlayer === item.id) {
      return {background: "#428bca", color: "#f9f9f9", cursor: "pointer"};
    }
    else if (this.state.mouseOver === item.id) {
      return {background: "#5bc0de", color: "#f9f9f9", cursor: "pointer"};
    }
    return {background: "white", color: "black", cursor: "pointer"};
  }

  render() {
    const data = this.props.data;
    return (
      <tr
        style={this.selectStyle(data)}
        onClick={ () => this.props.playerSelect(data)}
        onMouseEnter={() =>  this.onMouseEnter(data.id)}
        onMouseLeave={ () => this.onMouseLeave()}
      >
        <td>{data.name}</td>
        <td>{data.nationality}</td>
        <td>{data.association}</td>
      </tr>
    );
  }
}
PlayerRow.PropTypes = {
  data: PropTypes.object.isRequired,
  playerSelect: PropTypes.func.isRequired,
  selectedPlayer: PropTypes.number.isRequired,
}
PlayerRow.defaultProps = {}
export default PlayerRow;
