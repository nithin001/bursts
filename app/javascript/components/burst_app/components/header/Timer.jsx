import React, { useState, useEffect } from "react";
import moment from "moment";

function PaddedDisplay({ value }) {
  const displayValue = value + "";
  return <span>{displayValue.padStart(2, "0")}</span>;
}

function Timer({ burst }) {
  if (burst.status !== "active") {
    return <React.Fragment />;
  }

  const [startTime, setStartTime] = useState("");
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setStartTime(burst.started_at);
  }, [burst]);

  const hoursElapsed = moment().diff(startTime, "hours");
  const minutesElapsed = moment().diff(startTime, "minutes");
  const secondsElapsed = moment().diff(startTime, "seconds");
  const minutesDisplay =
    hoursElapsed > 0 ? minutesElapsed % 60 : minutesElapsed;
  const secondsDisplay =
    minutesDisplay > 0 ? secondsElapsed % 60 : secondsElapsed;
  return (
    <div className="p-1">
      {hoursElapsed > 0 && (
        <React.Fragment>
          <PaddedDisplay value={hoursElapsed} />:
        </React.Fragment>
      )}
      <PaddedDisplay value={minutesDisplay} />:
      <PaddedDisplay value={secondsDisplay} />
    </div>
  );
}
export default Timer;
