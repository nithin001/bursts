import React from "react";
import { AxiosInstance } from "../util";

class TasksForThisBurst extends React.Component {
  constructor(props) {
    super(props);
    this.removeFromBurst = this.removeFromBurst.bind(this);
  }

  removeFromBurst = (id) => {
    AxiosInstance()
      .post("/remove.json", {
        id,
      })
      .then(() => {
        this.props.reload();
      });
  };

  render() {
    return (
      <React.Fragment>
        <ul className="list-group mt-3">
          {this.props.tasks.map((task) => {
            return (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={task.id}
              >
                {task.description}
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => {
                    this.removeFromBurst(task.id);
                  }}
                >
                  Remove from burst
                </button>
              </li>
            );
          })}
        </ul>
      </React.Fragment>
    );
  }
}

export default TasksForThisBurst;
