import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { createWork, deleteWork } from '../../redux/actions';
import IconButton from '../common/IconButton';

function ToggleWorkIcon({ task, burstId }) {
  const dispatch = useDispatch();
  const createWorkAction = () => {
    dispatch(createWork(burstId, task.id));
  };

  const deleteWorkAction = () => {
    dispatch(deleteWork(task.workId));
  };

  if (task.isWorkedOn) {
    return (
      <IconButton
        className="fa fa-minus"
        action={deleteWorkAction}
      />
    );
  }
  return <IconButton className="fa fa-plus" action={createWorkAction} />;
}

ToggleWorkIcon.propTypes = {
  task: PropTypes.shape({
    status: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isWorkedOn: PropTypes.bool.isRequired,
  }),
  burstId: PropTypes.number.isRequired,
};

export default ToggleWorkIcon;
