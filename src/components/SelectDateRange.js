import React from 'react';
import PropTypes from 'prop-types';
import {Col, Button, Form, FormControl, FormGroup} from 'react-bootstrap';

class SelectDateRange extends React.Component {
  render() {
    return (
      <div>
        <Form horizontal>
          <FormGroup controlId="datesForm">
            <Col sm={4}>
              <FormControl type="text" placeholder="from: yyyy-DD-mm" onChange={this.props.onChangeFrom} value={this.props.dateFrom} />
            </Col>
            <Col sm={4}>
              <FormControl type="text" placeholder="to: yyyy-DD-mm" onChange={this.props.onChangeTo} value={this.props.dateTo} />
            </Col>
            <Col sm={4}>
              <Button bsStyle="success" onClick={ () => this.props.dateSet() }>Fetch</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
SelectDateRange.PropTypes = {
  onChangeFrom: PropTypes.func,
  onChangeTo: PropTypes.func,
  dateFrom: PropTypes.string,
  dateTo: PropTypes.string,
  dateSet: PropTypes.func,
}
SelectDateRange.defaultProps = {
  onChangeFrom: () => {},
  onChangeTo: () => {},
  dateFrom: "",
  dateTo: "",
  dateSet: () => {console.log("dates set: " + this.props.dateFrom + " - " + this.props.dateTo)},
}
export default SelectDateRange;
