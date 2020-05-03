import React from "react";
import moment from "moment";

import { useSelector } from "react-redux";
import { getFeedState } from "../../redux/selectors";
import Task from "./Task";
import "./bursts.scss";

function Bursts() {
  const feed = useSelector(getFeedState);
  if (!feed.loaded) {
    return <React.Fragment>Loading</React.Fragment>;
  }

  return feed.activities.map((activity) => {
    const date = moment(activity.date);
    console.log(activity);
    return (
      <div className="container mt-5 pb-5 border-bottom">
        <div className="row">
          <div class="col-2 d-flex align-items-center justify-content-start flex-column pt-3 position-sticky">
            <div className="activity-date shadow d-flex flex-column align-items-center justify-content-center">
              <span class="month">{date.format("MMMM")}</span>
              <span class="date">{date.format("DD")}</span>
              <span class="day">{date.format("dddd")}</span>
            </div>
          </div>
          <div className="col-10">
            <p class="small mt-3 text-muted">Bursted for a total of {activity.humanized_time_taken}</p>
            {activity.bursts.map((burst) => {
              const completedTasks = burst.tasks.filter(
                (task) => task.status === "complete"
              );
              return (
                <React.Fragment>
                  <div className="container bg-white shadow rounded mt-3">
                    <div className="row">
                      <div className="col-12 d-flex flex-column align-items-end justify-content-center">
                        <p class="text-muted text-right pr-3">
                          <small style={{ userSelect: "none" }}>
                            <span></span>
                            <br />
                            {burst.from_to}
                          </small>
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <p className="pb-3 text-white">
                          {completedTasks.map((task) => (
                            <Task task={task} />
                          ))}
                        </p>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    );
  });
}

export default Bursts;

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loadTasks } from "../../redux/actions";
// import { getBurstState, getTasksState } from "../../redux/selectors";

// import Task from "./Task";

// function Tasks() {
//   const burst = useSelector(getBurstState);
//   const taskState = useSelector(getTasksState);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(loadTasks(burst.id));
//   }, [burst]);

//   if (!taskState.loaded) {
//     return <React.Fragment>Loading</React.Fragment>;
//   }

//   return (
// <div className="container bg-task mt-5 p-0">
//   <div className="row">
//     <div className="col-12">
//       <div className="container bg-task--editing p-3">
//         <div className="row align-items-center justify-content-center">
//           <div className="col-6 text-white text-center align-items-center justify-content-center">
//             <span>Wednesday, 11 May 2020</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
//   <div className="container">
//     <div className="row">
//       <div className="col-3 d-flex flex-column align-items-end justify-content-center">
//         <p class="text-muted" >
//           <small style={{ userSelect: "none" }}>
//             <i class="fa fa-clock-o mr-2"></i>10 AM - 11 AM
//           </small>
//         </p>
//       </div>
//       <div className="col-9 border-left">
//         <p className="pt-3 pb-3 text-white">
//           {taskState.tasks.map((task) => <span className={"d-block"}>{task.description}</span>)}
//         </p>
//       </div>
//     </div>
//     <div className="row">
//       <div className="col-3 d-flex flex-column align-items-end justify-content-center">
//         <p class="text-muted" >
//           <small style={{ userSelect: "none" }}>
//             <i class="fa fa-clock-o mr-2"></i>10 AM - 11 AM
//           </small>
//         </p>
//       </div>
//       <div className="col-9 border-left">
//         <p className="pt-3 pb-3 text-white">
//           {taskState.tasks.map((task) => <span className={"d-block"}>{task.description}</span>)}
//         </p>
//       </div>
//     </div>
//   </div>
// </div>
//   );
// }

// export default Tasks;
