import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { deleteTask } from '../../redux/actions';
import IconButton from '../common/IconButton';

function RemoveIcon({ taskId }) {
  const dispatch = useDispatch();

  const removeTask = () => {
    dispatch(deleteTask(taskId));
  };

  return (
    <IconButton
      className="fa fa-trash-o ml-2"
      action={removeTask}
    />
  );
}

RemoveIcon.propTypes = {
  taskId: PropTypes.number.isRequired,
};

export default RemoveIcon;
