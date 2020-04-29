import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { editTask, toggleEditMode } from "../../redux/actions";
import TaskInput from "./TaskInput";
import { getApplicationState } from "../../redux/selectors";

function EditTask({ task }) {
  const dispatch = useDispatch();
  const application = useSelector(getApplicationState);
  const [description, setDescription] = useState("");

  const addTask = () => {
    dispatch(editTask(application.currentBurstId, task.id, description));
  };

  const cancelEdit = () => {
    dispatch(toggleEditMode(task.id));
  };

  return (
    <div className="card mt-3">
      <TaskInput
        onCommit={addTask}
        onChange={setDescription}
        defaultValue={task.description}
        onCancel={cancelEdit}
        editMode
      />
    </div>
  );
}

export default EditTask;
