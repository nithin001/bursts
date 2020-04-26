import React from "react";
import { AxiosInstance } from "../util";

class TasksForThisBurst extends React.Component {
  constructor(props) {
    super(props);
    this.completeTask = this.completeTask.bind(this);
  }

  completeTask = (id) => {
    AxiosInstance()
      .post("/complete_task.json", {
        id,
      })
      .then(() => {
        this.props.reload();
      });
  };

  render() {
    return (
      <React.Fragment>
        <h2>Tasks for this burst</h2>
        <ul className="list-group mt-3">
          {this.props.tasks.map((taskObj) => {
            const task = taskObj.task;
            return (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={task.id}
              >
                {taskObj.completed && (
                    <del>{task.description}</del>
                )}
                {!taskObj.completed && (
                  <>
                    {task.description}
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => {
                        this.completeTask(task.id);
                      }}
                    >
                      Complete
                    </button>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </React.Fragment>
    );
  }
}

export default TasksForThisBurst;
