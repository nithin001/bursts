import React from 'react';
import PropTypes from 'prop-types';
import ToggleWorkIcon from './ToggleWorkIcon';

function Task({ task, burstId }) {
  const className = task.isWorkedOn ? 'bg-task' : 'bg-task--editing';
  return (
    <div
      className={`d-flex align-items-center justify-content-between p-3 mt-3 mb-2 ${className} text-white rounded`}
    >
      <span className="ml-2 w-75">{task.description}</span>
      <ToggleWorkIcon task={task} burstId={burstId} />
    </div>
  );
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    isWorkedOn: PropTypes.bool.isRequired,
  }).isRequired,
  burstId: PropTypes.number.isRequired,
};

export default Task;
