import React, { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { AsyncTypeahead, hintContainer } from 'react-bootstrap-typeahead';
import { AxiosInstance } from '../../util/api';

import AcceptIcon from './AcceptIcon';
import CancelIcon from './CancelIcon';

function TaskInput({
  onCommit, onChange, editMode, description, onCancel, defaultValue,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const ref = useRef();

  const handleSearch = useCallback((query) => {
    setIsLoading(true);

    AxiosInstance()
      .get(`/tasks.json?query=${query}`)
      .then(resp => resp.data)
      .then((data) => {
        setOptions(data);
        setIsLoading(false);
      });
  }, []);

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      onCommit();
      ref.current.clear();
    }
  };

  const HintedFormControl = hintContainer(
    React.forwardRef((forwardedProps) => {
      const inputProps = { ...forwardedProps };
      delete inputProps.inputRef;
      return (
        <input
          type="text"
          {...inputProps}
          className="d-inline border-0 ml-1 w-100 bg-transparent text-white white-placeholder"
          placeholder="Describe a tiny and accountable task"
        />
      );
    }),
  );

  const renderInput = inputProps => <HintedFormControl {...inputProps} />;

  return (
    <div className="p-3 d-flex flex-column">
      <div className="d-flex align-items-center justify-content-between">
        {/* <i
          className="fa fa-square-o fa-lg mt-micro text-muted"
          aria-hidden="true"
        ></i> */}
        <AsyncTypeahead
          id="async-example"
          isLoading={isLoading}
          labelKey="login"
          minLength={3}
          onSearch={handleSearch}
          options={options}
          className="w-75"
          selectHintOnEnter
          onChange={(value) => {
            if (value[0]) {
              onChange(value[0]);
            }
          }}
          onInputChange={onChange}
          onKeyDown={handleKeyDown}
          ref={ref}
          renderInput={renderInput}
          defaultSelected={editMode ? [defaultValue] : []}
        />
        {!editMode && (
          <AcceptIcon
            onCommit={onCommit}
            ref={ref}
            description={description}
          />
        )}
        {editMode && (
          <div>
            <AcceptIcon
              onCommit={onCommit}
              ref={ref}
              description={description}
            />
            <CancelIcon onCancel={onCancel} ref={ref} />
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
  defaultValue: PropTypes.string.isRequired,
};


export default TaskInput;
