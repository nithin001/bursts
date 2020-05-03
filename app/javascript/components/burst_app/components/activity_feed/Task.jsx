import React from "react";

function Task({task}) {
  return (
    <div className="d-flex align-items-center justify-content-between m-2 bg-task text-white rounded">
      <span
        className={"ml-2 mr-2 w-100 p-2"}
      >
        {task.description}
      </span>
    </div>
  );
}

export default Task;
