import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import IconButton from '../common/IconButton';
import { startBurst } from '../../redux/actions';
import { getBurstState } from '../../redux/selectors';
import DateAndDurationPicker from './DateAndDurationPicker';

function Header({
  date, setDate, startedAt, setStartedAt,
  completedAt, setCompletedAt, onCommit,
}) {
  return (
    <div className="container bg-light border-bottom">
      <div className="row align-items-center justify-content-center">
        <div className="col-sm-6 p-3 d-flex flex-column align-items-start justify-content-center">
          <h3 className="text-task mb-0">Add tasks</h3>
          <small className="text-task">
            that you worked on in this session
          </small>
        </div>
        <div className="col-sm-6 p-3 d-flex flex-row align-items-center justify-content-end">
          <DateAndDurationPicker
            date={date}
            setDate={setDate}
            startedAt={startedAt}
            completedAt={completedAt}
            setCompletedAt={setCompletedAt}
            setStartedAt={setStartedAt}
          />
          <IconButton
            className="fa fa-save fa-2x text-task text-right ml-2"
            action={onCommit}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
