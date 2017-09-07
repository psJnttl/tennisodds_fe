import React from 'react';
import PropTypes from 'prop-types';
import {Col, Button, Form, FormControl, FormGroup} from 'react-bootstrap';

function SelectDateRange(props) {
    return (
      <div>
        <Form horizontal>
          <FormGroup controlId="datesForm">
            <Col sm={4}>
              <FormControl type="text" placeholder="from: yyyy-DD-mm" onChange={props.onChangeFrom} value={props.dateFrom} />
            </Col>
            <Col sm={4}>
              <FormControl type="text" placeholder="to: yyyy-DD-mm" onChange={props.onChangeTo} value={props.dateTo} />
            </Col>
            <Col sm={4}>
              <Button bsStyle="success" onClick={ () => props.dateSet() }>Fetch</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
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
  dateSet: () => {},
}
export default SelectDateRange;
