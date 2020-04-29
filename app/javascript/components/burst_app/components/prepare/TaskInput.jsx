import React, { useState, useCallback, useRef } from "react";
import { AsyncTypeahead, hintContainer } from "react-bootstrap-typeahead";
import { AxiosInstance } from '../../util/api';

export default function TaskInput(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const ref = useRef();

  const handleSearch = useCallback((query) => {
    setIsLoading(true);

    AxiosInstance()
      .get(`/tasks.json?query=${query}`)
      .then((resp) => resp.data)
      .then((data) => {
        setOptions(data);
        setIsLoading(false);
      });
  });

  const handleKeyDown = (e) => {
    if (e.keyCode == 13) {
      props.onCommit();
      ref.current.clear();
    }
  };

  const HintedFormControl = hintContainer(
    React.forwardRef((forwardedProps, ref) => {
      const inputProps = { ...forwardedProps };
      delete inputProps.inputRef;
      return (
        <input
          type="text"
          {...inputProps}
          className="d-inline border-0 ml-1 w-100"
          autoFocus
          placeholder="Describe a tiny and accountable task"
        />
      );
    })
  );

  const _renderInput = (inputProps) => {
    return <HintedFormControl {...inputProps} />;
  };

  return (
    <div className="p-3 d-flex flex-column">
      <div className="d-flex align-items-center">
        <i
          className="fa fa-square-o fa-lg mt-micro text-muted"
          aria-hidden="true"
        ></i>
        <AsyncTypeahead
          id="async-example"
          isLoading={isLoading}
          labelKey="login"
          minLength={3}
          onSearch={handleSearch}
          options={options}
          className="w-100"
          selectHintOnEnter
          onChange={(value) => {
            props.onChange(value[0]);
          }}
          onInputChange={props.onChange}
          onKeyDown={handleKeyDown}
          ref={ref}
          renderInput={_renderInput}
          defaultSelected={props.editMode ? [props.defaultValue] : []}
        />
      </div>
      <div className="d-flex align-items-center mt-3">
        {!props.editMode && (
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => {
              ref.current.clear();
              props.onCommit();
            }}
          >
            Add task
          </button>
        )}
        {props.editMode && (
          <React.Fragment>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => {
                ref.current.clear();
                props.onCommit();
              }}
            >
              Save
            </button>
            <button
              className="btn btn-sm btn-outline-secondary ml-2"
              onClick={() => {
                ref.current.clear();
                props.onCancel();
              }}
            >
              Discard Changes
            </button>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
