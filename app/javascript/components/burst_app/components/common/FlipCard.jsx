import React from 'react';
import ReactCardFlip from "react-card-flip";

export default class FlipCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isFlipped: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState((prevState) => ({ isFlipped: !prevState.isFlipped }));
  }

  render() {
    console.log("I am in")
    return (
      <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
        {this.props.front(this.handleClick)}
        {this.props.back(this.handleClick)}
      </ReactCardFlip>
    );
  }
}

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loadTasks, loadStats } from "../../redux/actions";
// import {
//   getBurstState,
//   getTasksState,
//   getStatsState,
// } from "../../redux/selectors";
// import FlipCard from "../common/FlipCard";
// import Stats from "./Stats";
// import "./analyze.scss";
// import {} from "../../redux/actions";
// import {} from "../../redux/selectors";

// function Analyze() {
//   const burst = useSelector(getBurstState);
//   const taskState = useSelector(getTasksState);
//   const stats = useSelector(getStatsState);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (burst.id) {
//       dispatch(loadTasks(burst.id));
//     }
//   }, [burst]);

//   useEffect(() => {
//     dispatch(loadStats());
//   }, []);

//   if (!taskState.loaded || !stats.loaded) {
//     return <React.Fragment>Loading</React.Fragment>;
//   }

//   if (burst.status !== "completed") {
//     return <React.Fragment />;
//   }

//   const completedTasksCount = taskState.tasks.filter(
//     (task) => task.status !== "complete"
//   ).length;

//   const incompleteTasksCount = taskState.tasks.length - completedTasksCount;

//   const taskCompletedTodayStat = (handleClick) => {
//     return (
//       <div class="statistic rounded border-0 w-100">
//         <span class="value">{stats.today.completed_task_count || 0}</span>
//         <span class="label">tasks completed Today</span>
//         <i
//           class="fa fa-angle-double-right fa-2x flipper"
//           onClick={handleClick}
//           aria-hidden="true"
//         ></i>
//       </div>
//     );
//   };

//   const taskSkippedStat = (handleClick) => {
//     return (
//       <div class="statistic rounded border-0">
//         <span class="value">{incompleteTasksCount}</span>
//         <span class="label">Skipped</span>
//         <i
//           class="fa fa-angle-double-left fa-2x flipper"
//           onClick={handleClick}
//           aria-hidden="true"
//         ></i>
//       </div>
//     );
//   };

//   const timeSpentToday = (handleClick) => {
//     return (
//       <div class="statistic rounded border-0">
//         <span class="value">{stats.today ? stats.today.humanized_time_taken.split(" ")[0]: '0'}</span>
//         <span class="label">
//           {stats.today && stats.today.humanized_time_taken.split(" ")[1]} BURSTED TODAY
//         </span>
//         <i
//           class="fa fa-angle-double-right fa-2x flipper"
//           onClick={handleClick}
//           aria-hidden="true"
//         ></i>
//       </div>
//     );
//   };

//   const averageBurstDuration = (handleClick) => {
//     return (
//       <div class="statistic rounded border-0">
//         <span class="value">{stats.average_time.split(" ")[0]}</span>
//         <span class="label">
//           {stats.average_time.split(" ")[1]} ON AVERAGE
//         </span>
//         <i
//           class="fa fa-angle-double-left fa-2x flipper"
//           onClick={handleClick}
//           aria-hidden="true"
//         ></i>
//       </div>
//     );
//   };

//   const timeThisWeek = (handleClick) => {
//     return (
//       <div class="statistic rounded border-0">
//         <span class="value">{stats.week.humanized_time_taken.split(" ")[0]}</span>
//         <span class="label">
//           {stats.week.humanized_time_taken.split(" ")[1]} BURSTED THIS WEEK
//         </span>
//         <i
//           class="fa fa-angle-double-right fa-2x flipper"
//           onClick={handleClick}
//           aria-hidden="true"
//         ></i>
//       </div>
//     );
//   };

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
//             <FlipCard front={taskCompletedTodayStat} back={taskSkippedStat} />
//           </div>
//           <div className="col-4 pt-5">
//             <FlipCard
//               front={timeSpentToday}
//               back={averageBurstDuration}
//             />
//           </div>
//           <div className="col-4 pt-5">
//             <FlipCard
//               front={timeThisWeek}
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
//           <Stats stats={stats} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Analyze;
