import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTasks } from "../../redux/actions";
import { getTasksState, getApplicationState } from "../../redux/selectors";
import _ from "lodash";

import AddTask from "./AddTask";
import Task from "./Task";
import IconButton from "../common/IconButton";
import { TOGGLE_SHOW_COMPLETED } from "../../redux/actionTypes";
import InfiniteScroll from "react-infinite-scroller";

function Tasks() {
  const taskState = useSelector(getTasksState);
  const application = useSelector(getApplicationState);
  const dispatch = useDispatch();

  const loader = useCallback(
    (page, clearOnLoad) => {
      dispatch(loadTasks(page, clearOnLoad, false));
    },
    [dispatch]
  );

  useEffect(() => {
    loader(1, true, false);
  }, []);

  if (!taskState.loaded) {
    return <React.Fragment>Loading</React.Fragment>;
  }

  const toggleShowCompleted = () => {
    dispatch({ type: TOGGLE_SHOW_COMPLETED });
  };

  const hasMore = taskState.tasks.length < taskState.count;

  const showComplete = application.showCompleted
    ? "fa-toggle-on"
    : "fa-toggle-off";

  const filteredTasks = application.showCompleted
    ? [...taskState.tasks]
    : [...taskState.tasks].filter((task) => task.status === "active");

  const tasks = _.reverse(_.sortBy(filteredTasks, (task) => task.id));

  return (
    <React.Fragment>
      <div className="row justify-content-center">
        <div className="col-10 clearfix">
          <div className="shadow burst-container rounded bg-white mt-5">
            <div className="border-bottom bg-light">
              <div className="p-3 d-flex flex-row align-items-start justify-content-between border-bottom">
                <div className="d-flex flex-column align-items-start">
                  <h3 className="text-task mb-0">Manage tasks</h3>
                  <small className="text-task">add/remove tasks</small>
                </div>
                <div className="d-flex flex-column align-items-end">
                  <small>Show completed</small>
                  <IconButton
                    className={`fa ${showComplete} fa-2x text-task`}
                    action={toggleShowCompleted}
                  />
                </div>
              </div>
            </div>
            <div className="p-3">
              <AddTask />
              <InfiniteScroll
                pageStart={1}
                loadMore={(page) => loader(page, false)}
                hasMore={hasMore}
                loader={<div />}
                key={application.showCompleted}
              >
                {tasks.map((task) => (
                  <Task task={task} key={task.id} />
                ))}
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Tasks;
