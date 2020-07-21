import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DayPicker } from 'react-dates';
import { loadActiveDates } from '../../redux/actions';
import { getApplicationState } from '../../redux/selectors';
import CircleIcon from '../common/CircleIcon';
import SessionsOnDay from './SessionsOnDay';
import './calendar.scss';
import moment from 'moment';

function Calendar({ onChangeDay, chosenDate }) {
  const applicationState = useSelector(getApplicationState);
  const dispatch = useDispatch();

  const renderDay = useCallback((day) => {
    const { activeDates } = applicationState;
    const hasEvent = activeDates
      .filter(dateObj => day.isSame(dateObj, 'day'))
      .length > 0;
    const isToday = day.isSame(chosenDate, 'day');
    const isFuture = day.isAfter(moment(), 'day');
    if (isFuture) {
      return (
        <div
          className="position-relative h-100 pt-2"
          style={{ backgroundColor: 'white', cursor: 'default' }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          {day.format('D')}
        </div>
      );
    }
    const backgroundColor = isToday ? '#f3f3f3' : 'white';
    return (
      <div
        className="position-relative h-100 pt-2"
        style={{ backgroundColor }}
      >
        {day.format('D')}
        {hasEvent && (
        <div className="position-absolute" style={{ bottom: -8, right: -8, color: 'orangered' }}>
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
      numberOfMonths={3}
      onDayMouseEnter={() => {}}
      onDayMouseLeave={() => {}}
      onDayClick={onChangeDay}
      renderDayContents={renderDay}
      initialVisibleMonth={() => chosenDate.subtract(2, 'months')}
      renderCalendarInfo={() => (<SessionsOnDay chosenDate={chosenDate} />)
      }
    />
  );
}

export default Calendar;
