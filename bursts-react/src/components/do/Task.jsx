import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import IconButton from '../common/IconButton';
import { skipTask, undoSkipTask } from '../../redux/actions';

function Task({ task }) {
  const dispatch = useDispatch();

  const clickAction = () => {
    if (task.status === 'worked') {
      dispatch(skipTask(task.burst_id, task.id));
    } else {
      dispatch(undoSkipTask(task.burst_id, task.id));
    }
  };

  const iconClassName = task.status === 'worked' ? 'fa-toggle-on' : 'fa-toggle-off';
  const bgClass = task.status === 'worked' ? 'bg-task' : 'bg-task bg-task--editing';
  return (
    <div className={`d-flex align-items-center justify-content-between p-3 mt-3 mb-2 ${bgClass} text-white rounded`}>
      <span className="ml-2">
        {task.status === 'skipped' && <span>{task.description}</span>}
        {task.status === 'worked' && <span>{task.description}</span>}
      </span>
      <IconButton className={`fa ${iconClassName} fa-lg text-white`} action={clickAction} />
    </div>
  );
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.oneOf(['skipped', 'worked']).isRequired,
    description: PropTypes.string.isRequired,
    burst_id: PropTypes.number.isRequired,
  }).isRequired,
};


export default Task;
