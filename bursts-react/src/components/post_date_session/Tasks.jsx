import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import _ from 'lodash';
import { loadTasks } from '../../redux/actions';
import { getTasksState } from '../../redux/selectors';
import AddTask from './AddTask';
import Task from './Task';

function Tasks({ works, createWork, deleteWork }) {
  const taskState = useSelector(getTasksState);
  const dispatch = useDispatch();

  const loader = useCallback(
    (page, clearOnLoad) => {
      dispatch(loadTasks(page, clearOnLoad, true));
    },
    [dispatch],
  );

  useEffect(() => {
    loader(1, true);
  }, [loader]);


  if (!taskState.loaded) {
    return <React.Fragment>Loading</React.Fragment>;
  }
  const hasMore = taskState.tasks.length < taskState.count;

  if (!taskState.loaded) {
    return <React.Fragment>Loading</React.Fragment>;
  }

  const tasks = taskState.tasks.map((task) => {
    const isWorkedOn = works.indexOf(task.id) >= 0;
    return { ...task, isWorkedOn };
  });

  const sortedTasks = _.reverse(_.sortBy(tasks, task => task.id));

  return (
    <div className="mt-3">
      <AddTask onCreate={id => createWork(id)} />
      <InfiniteScroll
        pageStart={1}
        loadMore={page => loader(page, false)}
        hasMore={hasMore}
        loader={<div />}
      >
        {sortedTasks.map(task => (
          <Task task={task} key={task.id} createWork={createWork} deleteWork={deleteWork} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default Tasks;
