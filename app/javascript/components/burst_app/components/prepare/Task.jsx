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
    <div className="d-flex align-items-center pl-3 pr-3 mt-3 mb-2">
      <RemoveIcon taskId={task.id} />
      <span
        className={"ml-2"}
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
    </div>
  );
}

export default Task;
