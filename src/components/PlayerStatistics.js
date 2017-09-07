import React from 'react';
import PropTypes from 'prop-types';
import {Table} from 'react-bootstrap';
import _ from 'lodash';

class PlayerStatistics extends React.Component {
  render() {
    let data;
    if (_.isEmpty(this.props.playerStats)) {
      data = { name:"", matchesTotal:0, expectedWins:0, expectedWinsPercent:0, expectedLosses:0, expectedLossesPercent:0,
                        unExpectedWins:0, unExpectedWinsPercent:0, unExpectedLosses:0, unExpectedLossesPercent:0 }
    } else {
      data = _.pick(this.props.playerStats, ['name', 'matchesTotal', 'expectedWins', 'expectedLosses',
                                             'unExpectedWins',  'unExpectedLosses', ]);
      if (data.matchesTotal > 0) {
        data.expectedWinsPercent = (data.expectedWins/data.matchesTotal * 100).toFixed(2);
        data.expectedLossesPercent = (data.expectedLosses/data.matchesTotal * 100).toFixed(2);
        data.unExpectedWinsPercent = (data.unExpectedWins/data.matchesTotal * 100).toFixed(2);
        data.unExpectedLossesPercent = (data.unExpectedLosses/data.matchesTotal * 100).toFixed(2);
      }
      else {
        data.expectedWinsPercent = 0;
        data.expectedLossesPercent = 0;
        data.unExpectedWinsPercent = 0;
        data.unExpectedLossesPercent = 0;
      }
    }
    return (
      <Table striped bordered condensed>
        <tbody>
          <tr>
            <td>name</td><td colSpan="2"><strong>{data.name}</strong></td>
          </tr>
          <tr>
            <td>matches played</td><td colSpan="2">{data.matchesTotal}</td>
          </tr>
          <tr>
            <td>expected wins</td><td>{data.expectedWins}</td><td> {data.expectedWinsPercent} %</td>
          </tr>
          <tr>
            <td>expected losses</td><td>{data.expectedLosses} </td><td>{data.expectedLossesPercent} %</td>
          </tr>
          <tr>
            <td>unexpected wins</td><td>{data.unExpectedWins}</td><td> {data.unExpectedWinsPercent} %</td>
          </tr>
          <tr>
            <td>unexpected losses</td><td>{data.unExpectedLosses} </td><td>{data.unExpectedLossesPercent} %</td>
          </tr>
        </tbody>
      </Table>
    );
  }

}

PlayerStatistics.PropTypes = {
  playerStats: PropTypes.object,
}
PlayerStatistics.defaultProps = {
  playerStats: {}
}

export default PlayerStatistics;
