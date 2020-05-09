import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { editTask, toggleEditMode } from '../../redux/actions';
import TaskInput from './TaskInput';

function EditTask({ task }) {
  const dispatch = useDispatch();
  const [description, setDescription] = useState(task.description);

  const addTask = () => {
    dispatch(editTask(task.id, description));
  };

  const cancelEdit = () => {
    dispatch(toggleEditMode(task.id));
  };
  return (
    <div className="card mt-3 bg-task bg-task--editing">
      <TaskInput
        onCommit={addTask}
        onChange={setDescription}
        defaultValue={task.description}
        onCancel={cancelEdit}
        description={description}
        editMode
      />
    </div>
  );
}

EditTask.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.oneOf(['complete', 'incomplete']).isRequired,
    description: PropTypes.string.isRequired,
    burst_id: PropTypes.number.isRequired,
  }).isRequired,
};

export default EditTask;
