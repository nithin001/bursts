import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../redux/actions";
import { getApplicationState } from "../../redux/selectors";

function RemoveIcon({ taskId }) {
  const dispatch = useDispatch();
  const application = useSelector(getApplicationState);

  const removeTask = () => {
    dispatch(deleteTask(application.currentBurstId, taskId));
  };

  return (
    <i
      className="fa fa-minus-square fa-lg mt-micro"
      aria-hidden="true"
      tabIndex="0"
      role="button"
      aria-pressed="false"
      style={{ cursor: "pointer" }}
      onClick={removeTask}
      onKeyDown={(e) => {
        if (e.which === 13 || e.which === 32) {
          removeTask();
        }
      }}
    />
  );
}

export default RemoveIcon;
