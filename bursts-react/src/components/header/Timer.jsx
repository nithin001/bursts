import React, { useState, useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

function PaddedDisplay({ value }) {
  const displayValue = `${value}`;
  return <span>{displayValue.padStart(2, '0')}</span>;
}

PaddedDisplay.propTypes = {
  value: PropTypes.string.isRequired,
};


function Timer({ burst }) {
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, [time]);


  const hoursElapsed = moment().diff(burst.started_at, 'hours');
  const minutesElapsed = moment().diff(burst.started_at, 'minutes');
  const secondsElapsed = moment().diff(burst.started_at, 'seconds');
  const minutesDisplay = hoursElapsed > 0 ? minutesElapsed % 60 : minutesElapsed;
  const secondsDisplay = minutesDisplay > 0 ? secondsElapsed % 60 : secondsElapsed;
  return (
    <div className="p-1">
      {hoursElapsed > 0 && (
        <React.Fragment>
          <PaddedDisplay value={hoursElapsed} />
          :
        </React.Fragment>
      )}
      <PaddedDisplay value={minutesDisplay} />
      :
      <PaddedDisplay value={secondsDisplay} />
    </div>
  );
}

Timer.propTypes = {
  burst: PropTypes.shape({
    status: PropTypes.oneOf(['draft', 'active', 'completed', 'notified']).isRequired,
    started_at: PropTypes.string.isRequired,
  }).isRequired,
};


export default Timer;
