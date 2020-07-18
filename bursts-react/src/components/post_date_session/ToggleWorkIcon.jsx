import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '../common/IconButton';

function ToggleWorkIcon({ task, createWork, deleteWork }) {
  const createWorkAction = () => {
    createWork(task.id);
  };

  const deleteWorkAction = () => {
    deleteWork(task.id);
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
};

export default ToggleWorkIcon;
