import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { completeTask, undoCompleteTask } from '../../redux/actions';
import IconButton from '../common/IconButton';

function ToggleCompleteIcon({ task }) {
  const dispatch = useDispatch();
  const completeTaskAction = () => {
    dispatch(completeTask(task.id));
  };

  const undoCompleteTaskAction = () => {
    dispatch(undoCompleteTask(task.id));
  };

  if (task.status === 'completed') {
    return (
      <IconButton
        className="fa fa-check-square"
        action={undoCompleteTaskAction}
      />
    );
  }
  return <IconButton className="fa fa-square" action={completeTaskAction} />;
}

ToggleCompleteIcon.propTypes = {
  task: PropTypes.shape({
    status: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
};

export default ToggleCompleteIcon;
