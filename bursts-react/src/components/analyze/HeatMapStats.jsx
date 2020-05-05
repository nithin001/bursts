import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import $ from 'jquery';

import { withFauxDOM } from 'react-faux-dom';
import createHeatMap from './heatmap';

class HeatmapStats extends React.Component {
  componentDidMount() {
    const { connectFauxDOM, graph } = this.props;
    const chart = connectFauxDOM('div', 'chart');
    const months = connectFauxDOM('div', 'months');
    const startDate = moment().subtract(1.6, 'years').startOf('week').toDate();
    const endDate = moment().toDate();
    const dates = graph.reduce((acc, stat) => {
      acc[stat.date] = { ...stat };
      return acc;
    }, {});
    const maxCount = Math.max(...graph.map(stat => stat.time_spent));
    const data = {
      dates,
      maxCount,
      startDate,
    };
    createHeatMap(chart, months, data, startDate, endDate);
  }

  componentDidUpdate() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  render() {
    const { chart } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 justify-content-end align-items-end">
            <div className="d-flex flex-row-reverse" style={{ overflow: 'hidden' }}>
              <div className="chart">{chart}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HeatmapStats.defaultProps = {
  chart: 'loading',
};

HeatmapStats.propTypes = {
  connectFauxDOM: PropTypes.func.isRequired,
  chart: PropTypes.node,
  graph: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    humanized_time_taken: PropTypes.string.isRequired,
    time_spent: PropTypes.number.isRequired,
  })).isRequired,
};

export default withFauxDOM(HeatmapStats);
