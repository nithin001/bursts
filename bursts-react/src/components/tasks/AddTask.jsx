import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createTask } from '../../redux/actions';
import TaskInput from './TaskInput';

function AddTask({ burstId }) {
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');

  const addTask = () => {
    dispatch(createTask(description, burstId));
    setDescription('');
  };

  return (
    <React.Fragment>
      <div className="card mt-3 bg-task bg-task--editing">
        <TaskInput
          onCommit={addTask}
          onChange={setDescription}
          description={description}
        />
      </div>
    </React.Fragment>
  );
}

export default AddTask;
