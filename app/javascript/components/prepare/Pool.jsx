import React from "react";
import { AxiosInstance } from "../util";

class Pool extends React.Component {
  constructor(props) {
    super(props);
    this.addToBurst = this.addToBurst.bind(this);
    this.moveToTrash = this.moveToTrash.bind(this);
  }

  addToBurst = (id) => {
    AxiosInstance()
      .post("/add_task.json", {
        id,
      })
      .then(() => {
        this.props.reload();
      });
  };

  moveToTrash = (id) => {
    AxiosInstance()
      .post("/trash.json", {
        id,
      })
      .then(() => {
        this.props.reload();
      });
  };

  render() {
    return (
      <React.Fragment>
        <h3 className="mt-3">Task pool</h3>
        <ul className="list-group mt-2">
          {this.props.tasks.map((task) => {
            return (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={task.id}
              >
                {task.description}
                <div>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => {
                      this.addToBurst(task.id);
                    }}
                  >
                    Add to burst
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger ml-1"
                    aria-label="Left Align"
                    onClick={() => {
                      this.moveToTrash(task.id);
                    }}
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </React.Fragment>
    );
  }
}

export default Pool;
