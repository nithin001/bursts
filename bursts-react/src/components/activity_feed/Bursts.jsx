import React from 'react';
import moment from 'moment';

import { useSelector } from 'react-redux';
import { getFeedState } from '../../redux/selectors';
import Burst from './Burst';

function Bursts() {
  const feed = useSelector(getFeedState);

  if (!feed.loaded) {
    return <React.Fragment>Loading</React.Fragment>;
  }

  return feed.activities.map((activity) => {
    const date = moment(activity.date);
    return (
      <div className="mt-1 pb-5 border-bottom">
        <div className="row">
          <div className="col-2 d-flex align-items-center justify-content-start flex-column pt-3 position-sticky no-select">
            <div className="activity-date shadow d-flex flex-column align-items-center justify-content-center">
              <span className="month">{date.format('MMMM')}</span>
              <span className="date">{date.format('DD')}</span>
              <span className="day">{date.format('dddd')}</span>
            </div>
          </div>
          <div className="col-10">
            <p className="small mt-3 text-muted no-select">
              {`Bursted for a total of ${activity.humanized_time_taken}`}
            </p>
            {activity.bursts.map(burst => <Burst burst={burst} />)}
          </div>
        </div>
      </div>
    );
  });
}

export default Bursts;
