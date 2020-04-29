import React from "react";

function Task({ task }) {
  if (task.status == "incomplete") {
    return <React.Fragment />;
  }
  return <p className="mt-3">{task.description}</p>;
}

export default Task;
