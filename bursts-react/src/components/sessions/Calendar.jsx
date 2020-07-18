import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DayPicker } from 'react-dates';
import { loadActiveDates } from '../../redux/actions';
import { getApplicationState } from '../../redux/selectors';
import CircleIcon from '../common/CircleIcon';

function Calendar({ onChangeDay, chosenDate }) {
  const applicationState = useSelector(getApplicationState);
  const dispatch = useDispatch();

  const renderDay = useCallback((day) => {
    const { activeDates } = applicationState;
    const hasEvent = activeDates
      .filter(dateObj => day.isSame(dateObj, 'day'))
      .length > 0;
    const isToday = day.isSame(chosenDate, 'day');
    return (
      <div className="position-relative">
        {day.format('D')}
        {isToday && (
          <div className="position-absolute" style={{ bottom: 10, right: 5, color: 'green' }}>
            <CircleIcon />
          </div>
        )}
        {hasEvent && (
        <div className="position-absolute" style={{ bottom: -14, right: -8, color: 'red' }}>
          <CircleIcon />
        </div>
        )}
      </div>
    );
  }, [chosenDate, applicationState]);

  const loader = useCallback(
    (page) => {
      dispatch(loadActiveDates(page));
    },
    [dispatch],
  );

  useEffect(() => {
    loader(1);
  }, [loader]);

  return (
    <DayPicker
      numberOfMonths={1}
      onDayMouseEnter={() => {}}
      onDayMouseLeave={() => {}}
      onDayClick={onChangeDay}
      renderDayContents={renderDay}
      initialVisibleMonth={() => chosenDate}
      enableOutsideDays
    />
  );
}

export default Calendar;
