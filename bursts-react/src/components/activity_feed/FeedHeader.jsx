import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import './feed_header.scss';
import { getDatesState, getApplicationState } from '../../redux/selectors';
import { UPDATE_DATES, TOGGLE_SKIPPED, TOGGLE_SPLIT_TO_BURSTS } from '../../redux/actionTypes';
import IconButton from '../common/IconButton';

function FeedHeader() {
  const dates = useSelector(getDatesState);
  const application = useSelector(getApplicationState);
  const dispatch = useDispatch();
  const [focusedInput, setFocusedInput] = useState();
  const toggleSkip = () => {
    dispatch({ type: TOGGLE_SKIPPED });
  };
  const toggleSplitToBurst = () => {
    dispatch({ type: TOGGLE_SPLIT_TO_BURSTS });
  };

  const showSkippedClass = application.showSkipped ? 'fa-toggle-on' : 'fa-toggle-off';
  const splitToBurstsClass = application.splitToBursts ? 'fa-toggle-on' : 'fa-toggle-off';
  return (
    <nav className="navbar sticky-top navbar-light bg-light p-3 mt-2w-100 feed-header">
      <DateRangePicker
        startDate={dates.startDate} // momentPropTypes.momentObj or null,
        endDate={dates.endDate} // momentPropTypes.momentObj or null,
        onDatesChange={({ startDate, endDate }) => {
          dispatch({ type: UPDATE_DATES, payload: { startDate, endDate } });
        }} // PropTypes.func.isRequired,
        focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={setFocusedInput} // PropTypes.func.isRequired,
        initialVisibleMonth={() => moment().subtract(1, 'M')} // PropTypes.func or null,
        isOutsideRange={date => moment().isBefore(date)}
      />
      <div className="d-flex align-items-end">
        <div className="d-flex flex-column align-items-end">
          <small>Show sessions</small>
          <IconButton className={`fa ${splitToBurstsClass} fa-2x text-task`} action={toggleSplitToBurst} />
        </div>
        <div className="d-flex flex-column align-items-end ml-5">
          <small>Show Skipped</small>
          <IconButton className={`fa ${showSkippedClass} fa-2x text-task`} action={toggleSkip} />
        </div>
      </div>
    </nav>
  );
}

export default FeedHeader;
