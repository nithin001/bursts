import React from "react";
import PropTypes from "prop-types";

function Task({ task, work }) {
  const bg = work.status === "worked" ? "bg-task" : "bg-task--editing";
  return (
    <div
      className={`d-flex align-items-center justify-content-between mt-2 mb-2 p-1 ${bg} text-white rounded`}
    >
      <span className="ml-2 mr-2 w-100 p-2">{task.description}</span>
    </div>
  );
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.oneOf(["complete", "incomplete"]).isRequired,
    description: PropTypes.string.isRequired,
    burst_id: PropTypes.number.isRequired,
  }).isRequired,
};

export default Task;
