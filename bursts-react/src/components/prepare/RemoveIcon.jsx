import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { deleteTask } from '../../redux/actions';
import { getApplicationState } from '../../redux/selectors';
import IconButton from '../common/IconButton';

function RemoveIcon({ taskId }) {
  const dispatch = useDispatch();
  const application = useSelector(getApplicationState);

  const removeTask = () => {
    dispatch(deleteTask(application.currentBurstId, taskId));
  };

  return (
    <IconButton
      className="fa fa-minus fa-lg"
      action={removeTask}
    />
  );
}

RemoveIcon.propTypes = {
  taskId: PropTypes.number.isRequired,
};

export default RemoveIcon;
