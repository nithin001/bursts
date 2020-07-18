import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { loadWorks } from '../../redux/actions';
import { getBurstState, getWorksState } from '../../redux/selectors';
import Task from './Task';

function Tasks() {
  const burst = useSelector(getBurstState);
  const worksState = useSelector(getWorksState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (burst.id) {
      dispatch(loadWorks(burst.id));
    }
  }, [dispatch, burst.id]);

  if (!worksState.loaded) {
    return <React.Fragment>Loading</React.Fragment>;
  }

  const tasks = worksState.works.map(work => ({ ...work.task, work }));

  const sortedTasks = _.reverse(_.sortBy(tasks, task => task.id));

  return (
    <div className="mt-3">
      {sortedTasks.map(task => (
        <Task task={task} key={task.id} />
      ))}
    </div>
  );
}

export default Tasks;
