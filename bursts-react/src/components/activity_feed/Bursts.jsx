import React from 'react';
import moment from 'moment';

import { useSelector } from 'react-redux';
import { getApplicationState, getFeedState } from '../../redux/selectors';
import Burst from './Burst';
import Task from './Task';

function Bursts() {
  const feed = useSelector(getFeedState);
  const application = useSelector(getApplicationState);

  if (!feed.loaded) {
    return <React.Fragment>Loading</React.Fragment>;
  }

  if (feed.activities.length === 0) {
    return (
      <div className="mt-3">
        <div className="container p-4 rounded shadow mb-5">
          <div className="row">
            <div className="col-12">
              <div className="d-flex justify-content-center align-items-center">
                <p className="lead">You did not burst during this period.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3">
      {feed.activities.map((activity) => {
        const date = moment(activity.date);
        const workedTasks = activity.bursts
          .map(burst => burst.burst)
          .map(burst => burst.works)
          .flat()
          .filter(work => work !== undefined);

        const processWorkedTasks = workedTasks.reduce((acc, work) => {
          const workAlreadyPresent = acc.filter(
            presentWork => presentWork.task.id === work.task.id,
          )[0];

          const worksWithoutCurrentWork = acc.filter(
            presentWork => presentWork.task.id !== work.task.id,
          );

          if (workAlreadyPresent) {
            const statusOfNewWork = work.status === 'worked' ? 'worked' : work.status;

            return [
              ...worksWithoutCurrentWork,
              { ...work, status: statusOfNewWork },
            ];
          }
          return [...worksWithoutCurrentWork, { ...work, status: work.status }];
        }, []);

        const processWorkedTasksWithFilter = application.showSkipped
          ? processWorkedTasks
          : processWorkedTasks.filter(task => task.status === 'worked');
        const workedTasksCount = processWorkedTasksWithFilter.length;

        return (
          <div className="container p-4 rounded shadow mb-5">
            <div className="row">
              <div className="col-12 ">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex flex-column">
                    <h4 className="pl-1 mb-0 text-muted">
                        {date.format('dddd')}
                        ,{date.format('DD MMMM')}
                      </h4>
                    <small className="mt-0 pl-1 text-muted no-select">
                        {`Bursted for a total of ${activity.humanized_time_taken}`}
                      </small>
                  </div>
                </div>
                {workedTasksCount === 0 && !application.splitToBursts && (
                <p className="mt-3 pl-1 text-muted no-select">
                  No tasks were bursted on this day.
                    </p>
                )}
                {!application.splitToBursts
                                && processWorkedTasksWithFilter.map(work => (
                                  <Task task={work.task} status={work.status} />
                                ))}
                {application.splitToBursts
                                && activity.bursts
                                  .map(burst => burst.burst)
                                  .map(burst => <Burst burst={burst} />)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Bursts;
