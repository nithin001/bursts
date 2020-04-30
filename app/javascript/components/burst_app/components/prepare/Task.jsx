import React, { useState }  from "react";
import { useDispatch } from "react-redux";
import { toggleEditMode } from "../../redux/actions";
import RemoveIcon from './RemoveIcon';
import EditTask from "./EditTask";

function Task({task}) {
  const dispatch = useDispatch();
  if(task.editMode) {
    return <EditTask task={task} />
  }

  const setEditMode = () => {
    dispatch(toggleEditMode(task.id));
  }
  return (
    <div className="d-flex align-items-center justify-content-between p-3 mt-3 mb-2 bg-task text-white rounded">
      <span
        className={"ml-2 w-75"}
        style={{ cursor: "pointer" }}
        tabIndex="0"
        role="button"
        aria-pressed="false"
        onClick={() => {
          setEditMode(true);
        }}
        onKeyDown={(e) => {
          if (e.which === 13 || e.which === 32) {
            setEditMode(true);
          }
        }}
      >
        {task.description}
      </span>
      <RemoveIcon taskId={task.id} />
    </div>
  );
}

export default Task;
