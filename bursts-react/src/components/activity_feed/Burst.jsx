import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Task from './Task';

import { getApplicationState } from '../../redux/selectors';

function Burst({ burst }) {
  const application = useSelector(getApplicationState);

  const workedTasks = burst.works.filter(work => work.status === 'worked');
  const skippedTasks = burst.works.filter(work => work.status !== 'worked');

  const emptyTasksMessage = (
    <p className="mt-3 pl-1 text-muted no-select">
      All tasks were skipped in this session.
    </p>
  );
  const duration = (
    <small className="text-muted p-0" style={{ userSelect: 'none' }}>
      {burst.humanized_from_to}
    </small>
  );
  return (
    <React.Fragment>
      {application.splitToBursts && (
        <React.Fragment>
          <div className="w-100 text-right">{duration}</div>
          {workedTasks.length === 0 && emptyTasksMessage}
        </React.Fragment>
      )}
      <div className="w-100">
        {workedTasks.map(work => (
          <Task task={work.task} status={work.status} />
        ))}
        {application.showSkipped
                && skippedTasks.map(work => <Task task={work.task} status={work.status} />)}
      </div>
      {application.splitToBursts && <hr />}
    </React.Fragment>
  );
}

Burst.propTypes = {
  burst: PropTypes.shape({
    tasks: PropTypes.array.isRequired,
    from_to: PropTypes.string.isRequired,
  }).isRequired,
};

export default Burst;
