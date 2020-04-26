import React from "react";
import moment from "moment";

import TasksForThisBurst from "./TasksForThisBurst";
import { AxiosInstance } from "../util";

class Running extends React.Component {
  constructor(props) {
    super(props);
    this.completeBurst = this.completeBurst.bind(this);
  }

  completeBurst = () => {
    AxiosInstance()
      .post("/complete.json")
      .then(() => {
        this.props.reload();
      });
  };

  render() {
    if (this.props.burst.status !== "active") {
      return <React.Fragment />;
    }
    const humanized = moment(this.props.burst.started_at).fromNow(true);
    return (
      <div className="mt-5">
        <h1>Your burst has been running since {humanized}</h1>
        <TasksForThisBurst
          tasks={this.props.burst.bursts_tasks}
          reload={this.props.reload}
        />
        <button
          className="btn btn-outline-primary btn-lg mt-3"
          onClick={this.completeBurst}
        >
          Complete Burst
        </button>
      </div>
    );
  }
}

export default Running;
