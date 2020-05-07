import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Task from "./Task";

import { getApplicationState } from "../../redux/selectors";

function Burst({ burst }) {
  const application = useSelector(getApplicationState);

  const workedTasks = burst.tasks.filter(
    (task) => task.status === "worked"
  );
  const skippedTasks = burst.tasks.filter((task) => task.status !== "worked");

  const emptyTasksMessage = (
    <p className="mt-3 pl-1 text-muted no-select">All tasks were skipped in this burst.</p>
  );
  const duration = (
    <small className="text-muted p-0" style={{ userSelect: "none" }}>
      {burst.from_to}
    </small>
  );
  return (
    <React.Fragment>
      {application.splitToBursts && (
        <React.Fragment>
          <div className="w-100 text-right">{duration}</div>
          {workedTasks.length === 0 && emptyTasksMessage}
        </React.Fragment>
      )}
      <div className="w-100">
        {workedTasks.map((task) => (
          <Task task={task} />
        ))}
        {application.showSkipped &&
          skippedTasks.map((task) => <Task task={task} />)}
      </div>
      {application.splitToBursts && <hr />}
    </React.Fragment>
  );
}

Burst.propTypes = {
  burst: PropTypes.shape({
    tasks: PropTypes.array.isRequired,
    from_to: PropTypes.string.isRequired,
  }).isRequired,
};

export default Burst;
