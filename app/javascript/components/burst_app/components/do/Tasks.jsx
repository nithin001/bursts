import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTasks } from "../../redux/actions";
import { getBurstState, getTasksState } from "../../redux/selectors";

import Task from "./Task";

function Tasks() {
  const burst = useSelector(getBurstState);
  const taskState = useSelector(getTasksState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks(burst.id));
  }, [burst]);

  if (!taskState.loaded) {
    return <React.Fragment>Loading</React.Fragment>;
  }

  return (
    <div className="mt-3">
      {taskState.tasks.map((task) => {
        return <Task task={task} key={task.id} />;
      })}
    </div>
  );
}

export default Tasks;
