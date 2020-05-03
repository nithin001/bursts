import React from "react";
import { useDispatch } from "react-redux";
import { completeTask, undoCompleteTask } from "../../redux/actions";

function Task({ task }) {
  const dispatch = useDispatch();

  const clickAction = () => {
    if(task.status === "complete") {
      dispatch(undoCompleteTask(task.burst_id, task.id));
    } else {
      dispatch(completeTask(task.burst_id, task.id));
    }
  };

  const iconClassName = task.status == "complete" ? "fa-check-square" : "fa-square";
  const bgClass = task.status == "complete" ? "bg-task" : "bg-task bg-task--editing";
  return (
    <div className={`d-flex align-items-center justify-content-between p-3 mt-3 mb-2 ${bgClass} text-white rounded`}>
      <span className={"ml-2"}>
        {task.status == "complete" && <del>{task.description}</del>}
        {task.status == "incomplete" && <span>{task.description}</span>}
      </span>
      <i
        className={`fa ${iconClassName} fa-lg text-white`}
        aria-hidden="true"
        tabIndex="0"
        role="button"
        style={{ cursor: "pointer" }}
        aria-pressed="false"
        onClick={clickAction}
        onKeyDown={(e) => {
          if (e.which === 13 || e.which === 32) {
            clickAction();
          }
        }}
      ></i>
      
    </div>
  );
}

export default Task;