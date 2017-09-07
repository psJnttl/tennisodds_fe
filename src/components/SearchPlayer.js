import React from 'react';
import PropTypes from 'prop-types';
import {Radio, Col, Form, FormControl, FormGroup} from 'react-bootstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import _ from 'lodash';

class SearchPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.selected = this.selected.bind(this);
    this.filterItem = this.filterItem.bind(this);
  }
  selected(item) {
    console.log("Selected: " + JSON.stringify(item));
    this.props.fetchPlayerStatistics(item.value.id);
    this.props.onChangeName({target: {value: item.value.name}});
  }
  transformList() {
    return  this.props.playerList.map( item =>
       _.assign({}, {value: item, label: item.name})
    );
  }
 filterItem(options, filter) {
   if (filter.length < 2 || this.props.valueR) {
     return ;
   }
    return options.label.toLowerCase().includes(filter.toLowerCase()); //
 }
 logChange(val) {
   console.log("Selected: " + JSON.stringify(val));
 }
  render() {
    const options = this.transformList();
    let selectComponent;
    if (!this.props.valueR ) {
      selectComponent =
      <Select
        name="playerSelect"
        value={this.props.name}
        options={options}
        onChange={this.selected}
        filterOption={this.filterItem}
        autosize={false}

        clearable={false}
        placeholder="search player"
        noResultsText={false}
      />;
    }
    else {
        selectComponent = <FormControl type="text" placeholder="search player" onChange={this.props.onChangeName} value={this.props.name} />;
    }

    return (
      <Form horizontal>
        <FormGroup controlId="searchForm">
          <Col sm={6}>
            {selectComponent}
          </Col>
          <Col sm={2}>
            <Radio name="searchGroup" inline checked={!this.props.valueR} value="auto" onClick={this.props.onClick} >
              autocomplete
            </Radio>
          </Col>
          <Col sm={4}>
            <Radio name="searchGroup" inline checked={this.props.valueR} value="full" onClick={this.props.onClick} >
              full player list
            </Radio>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}
SearchPlayer.PropTypes = {
  onChangeName: PropTypes.func,
  name: PropTypes.string,
  valueR: PropTypes.bool,
  playerList: PropTypes.array,
}
SearchPlayer.defaultProps = {
  onChangeName: () => {},
  name: "",
  valueR: false,
  playerList: [],
}
export default SearchPlayer;
