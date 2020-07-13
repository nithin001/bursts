import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import _ from 'lodash';
import { loadTasks, loadWorks } from '../../redux/actions';
import { getBurstState, getTasksState, getWorksState } from '../../redux/selectors';
import AddTask from '../tasks/AddTask';
import Task from './Task';

function Tasks() {
  const taskState = useSelector(getTasksState);
  const burst = useSelector(getBurstState);
  const worksState = useSelector(getWorksState);
  const dispatch = useDispatch();

  const loader = useCallback(
    (page, clearOnLoad) => {
      dispatch(loadTasks(page, clearOnLoad, true));
    },
    [dispatch],
  );

  useEffect(() => {
    loader(1, true);
  }, []);

  useEffect(() => {
    if (burst.id) {
      dispatch(loadWorks(burst.id));
    }
  }, [dispatch, burst.id]);

  if (!taskState.loaded || !worksState.loaded) {
    return <React.Fragment>Loading</React.Fragment>;
  }

  const hasMore = taskState.tasks.length < taskState.count;

  if (!taskState.loaded) {
    return <React.Fragment>Loading</React.Fragment>;
  }

  const tasks = taskState.tasks.map((task) => {
    const works = worksState.works.filter(work => work.task_id === task.id);
    if (works.length === 0) {
      return { ...task };
    }

    return { ...task, isWorkedOn: true, workId: works[0].id };
  });

  const sortedTasks = _.reverse(_.sortBy(tasks, task => task.id));

  return (
    <div className="mt-3">
      <AddTask burstId={burst.id} />
      <InfiniteScroll
        pageStart={1}
        loadMore={page => loader(page, false)}
        hasMore={hasMore}
        loader={<div />}
      >
        {sortedTasks.map(task => (
          <Task task={task} key={task.id} burstId={burst.id} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default Tasks;
