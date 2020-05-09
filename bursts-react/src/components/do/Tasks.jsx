import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTasks, loadWorks } from "../../redux/actions";
import {
  getBurstState,
  getTasksState,
  getWorksState,
} from "../../redux/selectors";
import _ from "lodash";
import InfiniteScroll from "react-infinite-scroller";
import Task from "./Task";

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

  const tasks = worksState.works.map((work) => {
    return { ...work.task, work: work };
  });

  const sortedTasks = _.reverse(_.sortBy(tasks, (task) => task.id));

  return (
    <div className="mt-3">
      {sortedTasks.map((task) => (
        <Task task={task} key={task.id} />
      ))}
    </div>
  );
}

export default Tasks;
