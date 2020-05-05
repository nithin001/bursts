import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateRangePicker } from "react-dates";
import moment from "moment";
import "./feed_header.scss";
import { getDatesState, getApplicationState } from "../../redux/selectors";
import { UPDATE_DATES, TOGGLE_SKIPPED } from "../../redux/actionTypes";
function FeedHeader() {
  const dates = useSelector(getDatesState);
  const application = useSelector(getApplicationState);
  const dispatch = useDispatch();
  const [focusedInput, setFocusedInput] = useState();
  const toggleSkip = () => {
    dispatch({ type: TOGGLE_SKIPPED });
  };
  const iconClass = application.showSkipped ? "fa-toggle-on" : "fa-toggle-off";
  return (
    <nav class="navbar sticky-top navbar-light bg-light p-2 m-0 w-100 feed-header">
      <DateRangePicker
        startDate={dates.startDate} // momentPropTypes.momentObj or null,
        endDate={dates.endDate} // momentPropTypes.momentObj or null,
        onDatesChange={({ startDate, endDate }) =>
          dispatch({ type: UPDATE_DATES, payload: { startDate, endDate } })
        } // PropTypes.func.isRequired,
        focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={setFocusedInput} // PropTypes.func.isRequired,
        initialVisibleMonth={() => moment().subtract(1, "M")} // PropTypes.func or null,
        isOutsideRange={(date) => moment().isBefore(date)}
      />
      <div className="d-flex flex-column align-items-end">
        <small>Show Skipped</small>
        <i
          className={`fa ${iconClass} fa-2x text-task`}
          aria-hidden="true"
          tabIndex="0"
          role="button"
          aria-pressed="false"
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            e.preventDefault();
            toggleSkip();
          }}
          onKeyDown={(e) => {
            if (e.which === 13 || e.which === 32) {
              e.preventDefault();
              toggleSkip();
            }
          }}
        />
      </div>
    </nav>
  );
}

export default FeedHeader;
