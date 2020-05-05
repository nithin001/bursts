import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Task from './Task';

import { getApplicationState } from '../../redux/selectors';

function Burst({ burst }) {
  const application = useSelector(getApplicationState);

  const completedTasks = burst.tasks.filter(
    task => task.status === 'complete',
  );
  const pendingTasks = burst.tasks.filter(
    task => task.status !== 'complete',
  );

  const emptyTasksMessage = (
    <small
      className="text-muted text-left p-0"
      style={{ userSelect: 'none' }}
    >
      No tasks were completed in this burst
    </small>
  );
  const duration = (
    <small
      className="text-muted text-right p-0"
      style={{ userSelect: 'none' }}
    >
      {burst.from_to}
    </small>
  );
  return (
    <div className="bg-white shadow rounded mt-3 p-3">
      <div className="w-100 d-flex flex-row align-items-between justify-content-between p-0">
        {completedTasks.length === 0 ? emptyTasksMessage : <small />}
        {duration}
      </div>
      <div className="w-100">
        {completedTasks.map(task => (<Task task={task} />))}
        {application.showSkipped && pendingTasks.map(task => <Task task={task} />)}
      </div>
    </div>
  );
}

Burst.propTypes = {
  burst: PropTypes.shape({
    tasks: PropTypes.array.isRequired,
    from_to: PropTypes.string.isRequired,
  }).isRequired,
};


export default Burst;
