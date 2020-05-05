import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStats } from "../../redux/actions";
import { getStatsState } from "../../redux/selectors";

function Analyze() {
  const stats = useSelector(getStatsState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadStats());
  }, []);

  if (!stats.loaded || stats.total === 0) {
    return <React.Fragment>Loading</React.Fragment>;
  }

  const taskCompletedTodayStat = (
    <div class="statistic rounded border-0 w-100">
      <span class="value">{stats.today ? stats.today.completed_task_count : 0}</span>
      <span class="label">tasks completed Today</span>
    </div>
  );

  const timeSpentToday = (
    <div class="statistic rounded border-0">
      <span class="value">
        {stats.today ? stats.today.humanized_time_taken.split(" ")[0] : 0}
      </span>
      <span class="label">
        {stats.today && stats.today.humanized_time_taken.split(" ")[1]} BURSTED
        TODAY
      </span>
    </div>
  );

  const timeThisWeek = (
    <div class="statistic rounded border-0">
      <span class="value">
        {stats.week ? stats.week.humanized_time_taken.split(" ")[0] : 0}
      </span>
      <span class="label">
        {stats.week && stats.week.humanized_time_taken.split(" ")[1]} BURSTED
        THIS WEEK
      </span>
    </div>
  );

  return (
    <div className="analyze mb-5">
      <div className="row">
        <div className="col-4 pt-5">{taskCompletedTodayStat}</div>
        <div className="col-4 pt-5">{timeSpentToday}</div>
        <div className="col-4 pt-5">{timeThisWeek}</div>
      </div>
      <div className="row align-items-center justify-content-end overflow-hidden ml-2">
        <div className="col-12">
          {/* <Stats stats={stats} /> */}
          {/* <div className="mt-5">
        <p className="text-center lead">
          Congratulations on finishing your burst!
        </p>
      </div> */}
        </div>
      </div>
    </div>
  );
}

export default Analyze;
