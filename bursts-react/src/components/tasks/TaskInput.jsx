import React from 'react';
import PropTypes from 'prop-types';
import AcceptIcon from './AcceptIcon';
import CancelIcon from './CancelIcon';
// import { AsyncTypeahead, hintContainer } from 'react-bootstrap-typeahead';
// import { AxiosInstance } from '../../util/api';

function TaskInput({
  onCommit, onChange, editMode, description, onCancel,
}) {
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      onCommit();
    }
  };

  return (
    <div className="p-3 d-flex flex-column">
      <div className="d-flex align-items-center justify-content-between">
        <div className="w-75">
          <input
            type="text"
            className="d-inline w-75 border-0 ml-1 w-100 bg-transparent text-white white-placeholder"
            placeholder="Describe a tiny and accountable task"
            onChange={(e) => {
              onChange(e.target.value);
            }}
            value={description}
            onKeyDown={handleKeyDown}
          />
        </div>
        {!editMode && (
        <AcceptIcon onCommit={onCommit} description={description} />
        )}
        {editMode && (
        <div>
          <AcceptIcon onCommit={onCommit} description={description} />
          <CancelIcon onCancel={onCancel} />
        </div>
        )}
      </div>
    </div>
  );
}

TaskInput.propTypes = {
  onCommit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  description: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default TaskInput;
