import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Card, CardBody } from "shards-react";

import Chart from "../../util/chart";

class SmallStats extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const chartOptions = {
      ...{
        maintainAspectRatio: true,
        responsive: true,
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
          custom: false,
        },
        elements: {
          point: {
            radius: 0,
          },
          line: {
            tension: 0.33,
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: false,
              ticks: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              gridLines: false,
              scaleLabel: false,
              ticks: {
                display: false,
                isplay: false,
                // Avoid getting the graph line cut of at the top of the canvas.
                // Chart.js bug link: https://github.com/chartjs/Chart.js/issues/4790
                suggestedMax: Math.max(...this.props.chartData[0].data) + 1,
              },
            },
          ],
        },
      },
      ...this.props.chartOptions,
    };

    const chartConfig = {
      ...{
        type: "line",
        data: {
          ...{
            labels: this.props.chartLabels,
          },
          ...{
            datasets: this.props.chartData,
          },
        },
        options: chartOptions,
      },
      ...this.props.chartConfig,
    };

    new Chart(this.canvasRef.current, chartConfig);
  }

  render() {
    const { variation } = this.props;

    const cardClasses = classNames(
      "stats-small",
      "border-0",
      "bg-transparent",
      variation && `stats-small--${variation}`
    );

    const cardBodyClasses = classNames(
      variation === "1" ? "p-0 d-flex" : "px-0 pb-0"
    );

    const canvasHeight = variation === "1" ? 120 : 60;
    return (
      <Card small className={cardClasses}>
        <CardBody className={cardBodyClasses}>
          <canvas
            height={canvasHeight}
            ref={this.canvasRef}
            className={`stats-small-1 w-100`}
            style={{ backgroundColor: "transparent" }}
          />
        </CardBody>
      </Card>
    );
  }
}

SmallStats.propTypes = {
  /**
   * The Small Stats variation.
   */
  variation: PropTypes.string,
  /**
   * The label.
   */
  label: PropTypes.string,
  /**
   * The value.
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The percentage number or string.
   */
  percentage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Whether is a value increase, or not.
   */
  increase: PropTypes.bool,
  /**
   * The Chart.js configuration object.
   */
  chartConfig: PropTypes.object,
  /**
   * The Chart.js options object.
   */
  chartOptions: PropTypes.object,
  /**
   * The chart data.
   */
  chartData: PropTypes.array.isRequired,
  /**
   * The chart labels.
   */
  chartLabels: PropTypes.array,
};

SmallStats.defaultProps = {
  increase: true,
  percentage: 0,
  value: 0,
  label: "Label",
  chartOptions: Object.create(null),
  chartConfig: Object.create(null),
  chartData: [],
  chartLabels: [],
};

export default SmallStats;


// import React, { useCallback } from "react";
// import { useSelector } from "react-redux";
// import { getBurstState } from "../../redux/selectors";
// import FlipCard from "../common/FlipCard";
// import Stats from "./Stats";
// import "./analyze.scss";
// import SmallStats from "../common/SmallStats";
// import Engineer from "images/undraw_through_the_park_lxnl";

// function Analyze() {
//   const burst = useSelector(getBurstState);
//   if (burst.status !== "completed") {
//     return <React.Fragment />;
//   }
  
//   const taskCompletedStat = useCallback((handleClick) => {
//     const stats = {
//       label: "Hours worked",
//       value: "1000",
//       chartLabels: [null, null, null, null, null, null, null],
//       attrs: { md: "2", sm: "2" },
//       datasets: [
//         {
//           label: "Today",
//           fill: "start",
//           borderWidth: 1.5,
//           backgroundColor: "rgba(0, 184, 216, 0.1)",
//           borderColor: "rgb(0, 184, 216)",
//           data: [1, 2, 2, 3, 5, 4, 7],
//         },
//       ],
//     };
//     return (
//       <div class="statistic rounded border-0 w-100">
//         <SmallStats
//           id={`small-stats-1`}
//           variation="1"
//           chartData={stats.datasets}
//           chartLabels={stats.chartLabels}
//           label={stats.label}
//           value={stats.value}
//         />
//         <span class="value">4</span>
//         <span class="label">Completed</span>
//         <i
//           class="fa fa-angle-double-right fa-2x flipper"
//           onClick={handleClick}
//           aria-hidden="true"
//         ></i>
//       </div>
//     );
//   }, []);
  
//   return (
//     <div className="analyze d-flex flex-column align-items-center justify-content-start p-2">
//       <div className="mt-5">
//         <p className="text-center lead">
//           Congratulations on finishing your burst!
//         </p>
//       </div>
//       <div className="container">
//         <div className="row">
//           <div className="col-4 pt-5">
//             <FlipCard
//               front={taskCompletedStat}
//               back={(handleClick) => (
//                 <div class="statistic rounded border-0">
//                   <span class="value">1</span>
//                   <span class="label">Skipped</span>
//                   <i
//                     class="fa fa-angle-double-left fa-2x flipper"
//                     onClick={handleClick}
//                     aria-hidden="true"
//                   ></i>
//                 </div>
//               )}
//             />
//           </div>
//           <div className="col-4 pt-5">
//             <FlipCard
//               front={(handleClick) => (
//                 <div class="statistic rounded border-0">
//                   <span class="value">4.5</span>
//                   <span class="label">HOURS ON THIS BURST</span>
//                   <i
//                     class="fa fa-angle-double-right fa-2x flipper"
//                     onClick={handleClick}
//                     aria-hidden="true"
//                   ></i>
//                 </div>
//               )}
//               back={(handleClick) => (
//                 <div class="statistic rounded border-0">
//                   <span class="value">4.5</span>
//                   <span class="label">HOURS AVERAGE DURATION</span>
//                   <i
//                     class="fa fa-angle-double-left fa-2x flipper"
//                     onClick={handleClick}
//                     aria-hidden="true"
//                   ></i>
//                 </div>
//               )}
//             />
//           </div>
//           <div className="col-4 pt-5">
//             <FlipCard
//               front={(handleClick) => (
//                 <div class="statistic rounded border-0">
//                   <span class="value">1000</span>
//                   <span class="label">HOURS WORKED</span>
//                   <i
//                     class="fa fa-angle-double-right fa-2x flipper"
//                     onClick={handleClick}
//                     aria-hidden="true"
//                   ></i>
//                 </div>
//               )}
//               back={(handleClick) => (
//                 <div class="statistic rounded border-0">
//                   <span class="value">500</span>
//                   <span class="label">BURSTS COMPLETED</span>
//                   <i
//                     class="fa fa-angle-double-left fa-2x flipper"
//                     onClick={handleClick}
//                     aria-hidden="true"
//                   ></i>
//                 </div>
//               )}
//             />
//           </div>
//         </div>
//         <div className="row align-items-center justify-content-end overflow-hidden ml-2">
//           <Stats />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Analyze;
