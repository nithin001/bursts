import * as d3 from "d3";
import moment from "moment";
const NUMBER_OF_COLORS = 6;
var CELL_SIZE = 14;

export default function createHeatMap(chart, months, data, startDate, endDate) {
  const numberOfWeeks = moment(endDate).diff(startDate, "weeks");
  var width = (CELL_SIZE+0.25) * (numberOfWeeks);
  var height = 100;
  var dx = 0;
  var gridClass = "js-date-grid day";
  var formatColor = d3
    .scaleQuantize()
    .domain([0, data.maxCount])
    .range(d3.range(NUMBER_OF_COLORS).map((d) => `color${d}`));

  var heatmapSvg = d3.select(chart)
    .selectAll("svg.heatmap")
    .enter()
    .append("svg")
    .data([1])
    .enter()
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "color");

  // Add a grid for each day between the date range.
  var dates = Object.keys(data.dates);
  var rect = heatmapSvg.append("g").attr("transform", `translate(${dx},0)`);
  rect
    .selectAll(".day")
    // The heatmap will contain all the days in that year.
    .data((d) => d3.timeDays(startDate, endDate))
    .enter()
    .append("rect")
    .attr("class", gridClass)
    .attr("width", CELL_SIZE)
    .attr("height", CELL_SIZE)
    .attr("x", (d) => {
        const weekNumber = moment(d).diff(moment(startDate), 'weeks');
        return weekNumber * CELL_SIZE;
    })
    .attr("y", (d) => d.getDay() * CELL_SIZE)
    .attr("data-toggle", "tooltip")
    .datum(d3.timeFormat("%Y-%m-%d"))
    // Add the grid data as a title attribute to render as a tooltip.
    .attr("title", (d) => {
      var countData = data.dates[d];
      var date = d3.timeFormat("%b %d, %Y")(new Date(d));
      if (!countData || !countData.count) return `No bursts on ${date}`;
      else if (countData.count === 1) return `1 burst on ${date} taking ${countData.humanized_time_taken}`;
      else return `${countData.count} bursts on ${date} taking ${countData.humanized_time_taken}`;
    })
    .attr("date", (d) => d)
    // Add bootstrap's tooltip event listener.
    .call(() =>
      $('[data-toggle="tooltip"]').tooltip({
        container: "body",
        placement: "top",
        position: { my: "top" },
      })
    )
    // Add the colors to the grids.
    .filter((d) => dates.indexOf(d) > -1)
    .attr("class", (d) => `${gridClass} ${formatColor(data.dates[d].count)}`);
  
  // const monthStart = moment(startDate).startOf('month').toDate()
  // d3.select(months)
  //   .selectAll("svg.months")
  //   .enter()
  //   .append("svg")
  //   .data([1])
  //   .enter()
  //   .append("svg")
  //   .attr("width", width)
  //   .attr("height", 20)
  //   .append("g")
  //   .attr("transform", "translate(0,10)")
  //   .selectAll(".month")
  //   .data((d) => d3.timeMonths(monthStart, endDate))
  //   .enter()
  //   .append("text")
  //   .attr("x", (d, index) => {
  //     const diff = moment(d).diff(startDate, "weeks")
  //     return (CELL_SIZE * diff) + dx
  //   })
  //   .text((d) => {
  //       return d3.timeFormat("%b")(new Date(d))
  //   });
}


// import * as d3 from "d3";
// import moment from "moment";
// const NUMBER_OF_COLORS = 6;
// var CELL_SIZE = 14;

// export default function createHeatMap(chart, months, data, startDate, endDate) {
//   const numberOfWeeks = moment(endDate).diff(startDate, "weeks");
//   var width = (CELL_SIZE+0.25) * (numberOfWeeks);
//   var height = 100;
//   var dx = 0;
//   var gridClass = "js-date-grid day";
//   var formatColor = d3
//     .scaleQuantize()
//     .domain([0, data.maxCount])
//     .range(d3.range(NUMBER_OF_COLORS).map((d) => `color${d}`));

//   var heatmapSvg = d3.select(chart)
//     .selectAll("svg.heatmap")
//     .enter()
//     .append("svg")
//     .data([1])
//     .enter()
//     .append("svg")
//     .attr("width", width)
//     .attr("height", height)
//     .attr("class", "color");

//   // Add a grid for each day between the date range.
//   var dates = Object.keys(data.dates);
//   var rect = heatmapSvg.append("g").attr("transform", `translate(${dx},0)`);
//   rect
//     .selectAll(".day")
//     // The heatmap will contain all the days in that year.
//     .data((d) => d3.timeDays(startDate, endDate))
//     .enter()
//     .append("rect")
//     .attr("class", gridClass)
//     .attr("width", CELL_SIZE)
//     .attr("height", CELL_SIZE)
//     .attr("x", (d) => {
//         const weekNumber = moment(d).diff(moment(startDate), 'weeks');
//         return weekNumber * CELL_SIZE;
//     })
//     .attr("y", (d) => d.getDay() * CELL_SIZE)
//     .attr("data-toggle", "tooltip")
//     .datum(d3.timeFormat("%Y-%m-%d"))
//     // Add the grid data as a title attribute to render as a tooltip.
//     .attr("title", (d) => {
//       var countData = data.dates[d];
//       var date = d3.timeFormat("%b %d, %Y")(new Date(d));
//       if (!countData || !countData.count) return `No bursts on ${date}`;
//       else if (countData.count === 1) return `1 burst on ${date} taking ${countData.humanized_time_taken}`;
//       else return `${countData.count} bursts on ${date} taking ${countData.humanized_time_taken}`;
//     })
//     .attr("date", (d) => d)
//     // Add bootstrap's tooltip event listener.
//     .call(() =>
//       $('[data-toggle="tooltip"]').tooltip({
//         container: "body",
//         placement: "top",
//         position: { my: "top" },
//       })
//     )
//     // Add the colors to the grids.
//     .filter((d) => dates.indexOf(d) > -1)
//     .attr("class", (d) => `${gridClass} ${formatColor(data.dates[d].count)}`);
  
//   const monthStart = moment(startDate).startOf('month').toDate()
//   d3.select(months)
//     .selectAll("svg.months")
//     .enter()
//     .append("svg")
//     .data([1])
//     .enter()
//     .append("svg")
//     .attr("width", width)
//     .attr("height", 20)
//     .append("g")
//     .attr("transform", "translate(0,10)")
//     .selectAll(".month")
//     .data((d) => d3.timeMonths(monthStart, endDate))
//     .enter()
//     .append("text")
//     .attr("x", (d, index) => {
//       const diff = moment(d).diff(startDate, "weeks")
//       return (CELL_SIZE * diff) + dx
//     })
//     .text((d) => {
//         return d3.timeFormat("%b")(new Date(d))
//     });
// }
