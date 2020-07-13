import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import IconButton from '../common/IconButton';
import { markWorked, undoMarkWorked } from '../../redux/actions';

function Task({ task }) {
  const dispatch = useDispatch();

  const clickAction = () => {
    if (task.work.status === 'skipped') {
      dispatch(markWorked(task.work.id, false));
    } else if (task.status === 'active') {
      dispatch(markWorked(task.work.id, true));
    } else {
      dispatch(undoMarkWorked(task.work.id));
    }
  };

  const iconClassName = task.status === 'active'
    ? task.work.status === 'worked'
      ? 'fa-check-square'
      : 'fa-square'
    : 'fa-check-square-o';
  const bgClass = task.work.status === 'worked' ? 'bg-task' : 'bg-task bg-task--editing';
  return (
    <div
      className={`d-flex align-items-center justify-content-between p-3 mt-3 mb-2 ${bgClass} text-white rounded`}
    >
      <span className="ml-2">
        {task.status === 'completed' && (
        <span>
          <del>{task.description}</del>
        </span>
        )}
        {task.status === 'active' && <span>{task.description}</span>}
      </span>
      <IconButton
        className={`fa ${iconClassName} fa-lg text-white`}
        action={clickAction}
      />
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
