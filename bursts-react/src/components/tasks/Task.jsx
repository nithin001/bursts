import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { toggleEditMode } from "../../redux/actions";
import RemoveIcon from "./RemoveIcon";
import EditTask from "./EditTask";
import ToggleCompleteIcon from "./ToggleCompleteIcon";
import Tasks from "./Tasks";

function Task({ task }) {
  const dispatch = useDispatch();
  if (task.editMode) {
    return <EditTask task={task} />;
  }

  const setEditMode = () => {
    dispatch(toggleEditMode(task.id));
  };

  if(task.status === 'completed') {
    return (
      <div className="d-flex align-items-center justify-content-between p-3 mt-3 mb-2 bg-task--editing text-white rounded">
        <span
          className="ml-2 w-75"
        >
          <del>{task.description}</del>
        </span>
        <div>
          <ToggleCompleteIcon task={task} />
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex align-items-center justify-content-between p-3 mt-3 mb-2 bg-task text-white rounded">
      <span
        className="ml-2 w-75"
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
      <div>
        <ToggleCompleteIcon task={task} />
        <RemoveIcon taskId={task.id} />
      </div>
    </div>
  );
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.oneOf(["complete", "incomplete"]).isRequired,
    description: PropTypes.string.isRequired,
    burst_id: PropTypes.number.isRequired,
    editMode: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Task;
