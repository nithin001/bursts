import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createTask } from '../../redux/actions';
import TaskInput from './TaskInput';
import { getApplicationState } from '../../redux/selectors';

function AddTask() {
  const dispatch = useDispatch();
  const application = useSelector(getApplicationState);
  const [description, setDescription] = useState('');

  const addTask = () => {
    dispatch(createTask(application.currentBurstId, description));
    setDescription('');
  };

  return (
    <React.Fragment>
      <div className="card mt-3 bg-task bg-task--editing">
        <TaskInput onCommit={addTask} onChange={setDescription} description={description} />
      </div>
    </React.Fragment>
  );
}

export default AddTask;
