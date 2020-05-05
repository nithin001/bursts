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
//     <div className="container bg-task mt-5 p-0">
//       <div className="row">
//         <div className="col-12">
//           <div className="container bg-task--editing p-3">
//             <div className="row align-items-center justify-content-center">
//               <div className="col-6 text-white text-center align-items-center justify-content-center">
//                 <span>Wednesday, 11 May 2020</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="container">
//         <div className="row">
//           <div className="col-3 d-flex flex-column align-items-end justify-content-center">
//             <p class="text-muted" >
//               <small style={{ userSelect: "none" }}>
//                 <i class="fa fa-clock-o mr-2"></i>10 AM - 11 AM
//               </small>
//             </p>
//           </div>
//           <div className="col-9 border-left">
//             <p className="pt-3 pb-3 text-white">
//               {taskState.tasks.map((task) => <span className={"d-block"}>{task.description}</span>)}
//             </p>
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-3 d-flex flex-column align-items-end justify-content-center">
//             <p class="text-muted" >
//               <small style={{ userSelect: "none" }}>
//                 <i class="fa fa-clock-o mr-2"></i>10 AM - 11 AM
//               </small>
//             </p>
//           </div>
//           <div className="col-9 border-left">
//             <p className="pt-3 pb-3 text-white">
//               {taskState.tasks.map((task) => <span className={"d-block"}>{task.description}</span>)}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Tasks;


// // import React, { useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { loadTasks } from "../../redux/actions";
// // import { getBurstState, getTasksState } from "../../redux/selectors";

// // import Task from "./Task";

// // function Tasks() {
// //   const burst = useSelector(getBurstState);
// //   const taskState = useSelector(getTasksState);
// //   const dispatch = useDispatch();

// //   useEffect(() => {
// //     dispatch(loadTasks(burst.id));
// //   }, [burst]);

// //   if (!taskState.loaded) {
// //     return <React.Fragment>Loading</React.Fragment>;
// //   }

// //   return (
// //     <div className="container bg-task mt-5 p-0">
// //       <div className="row">
// //         <div className="col-12">
// //           <div className="container bg-task--editing p-3">
// //             <div className="row align-items-center justify-content-center">
// //               <div className="col-6 text-white text-center align-items-center justify-content-center">
// //                 <span>Wednesday, 11 May 2020</span>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //       <div className="container">
// //         <div className="row">
// //           <div className="col-3 d-flex flex-column align-items-end justify-content-center">
// //             <p class="text-muted" >
// //               <small style={{ userSelect: "none" }}>
// //                 <i class="fa fa-clock-o mr-2"></i>10 AM - 11 AM
// //               </small>
// //             </p>
// //           </div>
// //           <div className="col-9 border-left">
// //             <p className="pt-3 pb-3 text-white">
// //               {taskState.tasks.map((task) => <span className={"d-block"}>{task.description}</span>)}
// //             </p>
// //           </div>
// //         </div>
// //         <div className="row">
// //           <div className="col-3 d-flex flex-column align-items-end justify-content-center">
// //             <p class="text-muted" >
// //               <small style={{ userSelect: "none" }}>
// //                 <i class="fa fa-clock-o mr-2"></i>10 AM - 11 AM
// //               </small>
// //             </p>
// //           </div>
// //           <div className="col-9 border-left">
// //             <p className="pt-3 pb-3 text-white">
// //               {taskState.tasks.map((task) => <span className={"d-block"}>{task.description}</span>)}
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Tasks;
