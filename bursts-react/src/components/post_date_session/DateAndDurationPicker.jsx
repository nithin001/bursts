import React, { useState } from 'react';

import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import Select from 'react-select';

function getTimeStops(start, end) {
  const startTime = moment(start, 'HH:mm');
  const endTime = moment(end, 'HH:mm');

  if (endTime.isBefore(startTime)) {
    endTime.add(1, 'day');
  }

  const timeStops = [];
  let multiplier = 1;

  while (startTime <= endTime) {
    timeStops.push({ label: moment(startTime).format('HH:mm'), value: `${multiplier * 15}` });
    startTime.add(15, 'minutes');
    multiplier += 1;
  }
  return timeStops;
}

const textStyleProvider = provided => ({
  // none of react-select's styles are passed to <Control />
  ...provided,
  fontWeight: '200',
  fontSize: '19px',
  lineHeight: '24px',
  color: '#484848',
  backgroundColor: '#fff',
  width: '200px',
  padding: '11px 11px 9px',
  border: '0',
  borderTop: '0',
  borderRight: '0',
  borderBottom: '2px solid transparent',
  borderLeft: '0',
  borderRadius: '0',
});
const customStyles = {
  option: provided => ({
    ...provided,
  }),
  singleValue: textStyleProvider,
  placeholder: textStyleProvider,
  control: provided => ({
    ...provided,
    height: '48px',
    borderRadius: '2px',
  }),
  valueContainer: provided => ({
    ...provided,
    margin: '0',
    padding: '0',
    background: '#fff',
    position: 'relative',
    display: 'inline-block',
    width: '130px',
    verticalAlign: 'middle',
  }),
  indicatorsContainer: () => ({ display: 'none' }),
};

function DateAndDurationPicker({
  date, setDate, startedAt, setStartedAt, completedAt, setCompletedAt,
}) {
  const options = getTimeStops('00:15', '23:45');
  const [focused, setFocused] = useState(false);
  return (
    <React.Fragment>
      <div className="ml-2">
        <SingleDatePicker
          date={date} // momentPropTypes.momentObj or null
          onDateChange={dateObj => setDate(dateObj)} // PropTypes.func.isRequired
          focused={focused} // PropTypes.bool
          onFocusChange={focusObj => setFocused(focusObj.focused)} // PropTypes.func.isRequired
          numberOfMonths={1}
          isOutsideRange={dateObj => moment().isBefore(dateObj)}
          initialVisibleMonth={() => date} // PropTypes.func or null,
        />
      </div>
      <div className="ml-2">
        <Select
          styles={customStyles}
          options={options}
          onChange={value => setStartedAt(value)}
          placeholder="Started At"
          isClearable={false}
          isSearchable={false}
          defaultValue={startedAt}
        />
      </div>

      <div className="ml-2">
        <Select
          styles={customStyles}
          options={options}
          onChange={value => setCompletedAt(value)}
          placeholder="Completed At"
          isClearable={false}
          isSearchable={false}
          defaultValue={completedAt}
        />
      </div>

    </React.Fragment>
  );
}

export default DateAndDurationPicker;
