import React from 'react';
import PropTypes from 'prop-types';
import {Button, Pagination, Table} from 'react-bootstrap';
import PlayerRow from './PlayerRow';

class PlayerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {itemsPerPage: 10, currentPage: 1, cmLen0:0, cmLen1:1, cmSel: false, }
    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.setItemsPerPage = this.setItemsPerPage.bind(this);
  }
  monitorchange(pageAmount) {
    if (this.state.cmSel) {
      this.setState({cmLen1: pageAmount}, this.determineCurrentPage());
    }
    else {
      this.setState({cmLen0: pageAmount}, this.determineCurrentPage());
    }
  }
  determineCurrentPage() {
    if (this.state.cmLen0 !== this.state.cmLen1) {
      this.setState({currentPage: 1});
    }
  }
  setCurrentPage(pageNbr) {
    this.setState({currentPage: pageNbr})
  }

  paginate (item, index) {
    return (index >= (this.state.currentPage-1) * this.state.itemsPerPage) && (index < (this.state.currentPage-1) * this.state.itemsPerPage + this.state.itemsPerPage);
  }

  setItemsPerPage(nbrItems) {
    this.setState({itemsPerPage: nbrItems});
  }

  render() {
    if (this.props.show === false) {
      return null;
    }
    const pageAmount = Math.ceil(this.props.list.length / this.state.itemsPerPage);
    const paginated = this.props.list.filter ( (item, index) => this.paginate(item, index) );

    const dataRows = paginated.map( (item, index) =>
      <PlayerRow
        key={index}
        data={item}
        playerSelect={this.props.playerSelect}
        selectedPlayer={this.props.selectedPlayer}
      />
    );

    return (
      <div>
        <Table bordered condensed hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Nationality</th>
              <th>Association</th>
            </tr>
          </thead>
          <tbody>
            {dataRows}
          </tbody>
        </Table>
        <Pagination
          bsSize="medium"
          items={ pageAmount }
          activePage={this.state.currentPage}
          onSelect={ this.setCurrentPage}
          prev
          next
          boundaryLinks
          ellipsis
          maxButtons={5}
        /> < br/>
        <Button bsStyle={this.state.itemsPerPage === 5 ? "primary" : "default"} bsSize="small" onClick={() => this.setItemsPerPage(5)}>5</Button>
        <Button bsStyle={this.state.itemsPerPage === 10 ? "primary" : "default"} bsSize="small" onClick={() => this.setItemsPerPage(10)}>10</Button>
        <Button bsStyle={this.state.itemsPerPage === 20 ? "primary" : "default"} bsSize="small" onClick={() => this.setItemsPerPage(20)}>20</Button>
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
