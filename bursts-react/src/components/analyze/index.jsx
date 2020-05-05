import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadStats } from '../../redux/actions';
import { getStatsState } from '../../redux/selectors';
import HeatMapStats from './HeatMapStats';

function Analyze() {
  const stats = useSelector(getStatsState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadStats());
  }, [dispatch]);

  if (!stats.loaded || stats.total === 0) {
    return <React.Fragment />;
  }

  const taskCompletedTodayStat = (
    <div className="statistic rounded border-0 w-100">
      <span className="value">{stats.today ? stats.today.completed_task_count : 0}</span>
      <span className="label">tasks completed Today</span>
    </div>
  );

  const timeSpentToday = (
    <div className="statistic rounded border-0">
      <span className="value">
        {stats.today ? stats.today.humanized_time_taken.split(' ')[0] : 0}
      </span>
      <span className="label">
        {stats.today && stats.today.humanized_time_taken.split(' ')[1]}
        {' '}
        BURSTED
        TODAY
      </span>
    </div>
  );

  const timeThisWeek = (
    <div className="statistic rounded border-0">
      <span className="value">
        {stats.week ? stats.week.humanized_time_taken.split(' ')[0] : 0}
      </span>
      <span className="label">
        {stats.week && stats.week.humanized_time_taken.split(' ')[1]}
        {' '}
        BURSTED
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
      {false && (
      <div className="row align-items-center justify-content-end overflow-hidden ml-2">
        <div className="col-12">
          <HeatMapStats graph={stats.graph} />
        </div>
      </div>
      )}
    </div>
  );
}

export default Analyze;
