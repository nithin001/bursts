import * as d3 from 'd3';
import moment from 'moment';
import $ from 'jquery';
window.$ = $
window.jQuery = $

const NUMBER_OF_COLORS = 6;
const CELL_SIZE = 14;

export default function createHeatMap(chart, months, data, startDate, endDate) {
  const numberOfWeeks = moment(endDate).diff(startDate, 'weeks');
  const width = (CELL_SIZE + 0.25) * (numberOfWeeks);
  const height = 100;
  const dx = 0;
  const gridClass = 'js-date-grid day';
  const formatColor = d3
    .scaleQuantize()
    .domain([0, data.maxCount])
    .range(d3.range(NUMBER_OF_COLORS).map(d => `color${d}`));

  const heatmapSvg = d3.select(chart)
    .selectAll('svg.heatmap')
    .enter()
    .append('svg')
    .data([1])
    .enter()
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'color');

  // Add a grid for each day between the date range.
  const dates = Object.keys(data.dates);
  const rect = heatmapSvg.append('g').attr('transform', `translate(${dx},0)`);
  rect
    .selectAll('.day')
    // The heatmap will contain all the days in that year.
    .data(() => d3.timeDays(startDate, endDate))
    .enter()
    .append('rect')
    .attr('class', gridClass)
    .attr('width', CELL_SIZE)
    .attr('height', CELL_SIZE)
    .attr('x', (d) => {
      const weekNumber = moment(d).diff(moment(startDate), 'weeks');
      return weekNumber * CELL_SIZE;
    })
    .attr('y', d => d.getDay() * CELL_SIZE)
    .attr('data-toggle', 'tooltip')
    .datum(d3.timeFormat('%Y-%m-%d'))
    // Add the grid data as a title attribute to render as a tooltip.
    .attr('title', (d) => {
      const countData = data.dates[d];
      const date = d3.timeFormat('%b %d, %Y')(new Date(d));
      if (!countData || !countData.count) return `No bursts on ${date}`;
      if (countData.count === 1) return `1 burst on ${date} taking ${countData.humanized_time_taken}`;
      return `${countData.count} bursts on ${date} taking ${countData.humanized_time_taken}`;
    })
    .attr('date', d => d)
    // Add bootstrap's tooltip event listener.
    .call(() => $('[data-toggle="tooltip"]').tooltip({
      container: 'body',
      placement: 'top',
      position: { my: 'top' },
    }))
    // Add the colors to the grids.
    .filter(d => dates.indexOf(d) > -1)
    .attr('class', d => `${gridClass} ${formatColor(data.dates[d].count)}`);
}
