import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createTask } from "../../redux/actions";
import TaskInput from "./TaskInput";
import { getApplicationState } from "../../redux/selectors";

function AddTask() {
  const dispatch = useDispatch();
  const application = useSelector(getApplicationState);
  const [description, setDescription] = useState("");
  
  const addTask = () => {
    dispatch(createTask(application.currentBurstId, description));
  };

  return (
    <React.Fragment>
      <div className="card mt-3">
        <TaskInput onCommit={addTask} onChange={setDescription} />
      </div>
      <small className="form-text text-muted mt-3">
        Pro tip: Press &#8629; to save changes
      </small>
    </React.Fragment>
  );
}

export default AddTask;
