import React from "react";
import { AxiosInstance } from '../util';
import AddTask from './AddTask';
import Pool from './Pool';
import TasksForThisBurst from './TasksForThisBurst';

class Prepare extends React.Component {
  constructor(props) {
    super(props);
    this.startBurst = this.startBurst.bind(this);
  }

  startBurst = () => {
    AxiosInstance().post("/start.json").then(() => {
      this.props.reload();
    });
  }

  render() {
    if (this.props.burst.status !== "draft") {
      return <React.Fragment />;
    }

    return (
      <div className="mt-3">
        <h1>Prepare for your burst</h1>
        <h2>Add tasks you want to complete in this burst</h2>
        <AddTask reload={this.props.reload} />
        <TasksForThisBurst tasks={this.props.burst.tasks} reload={this.props.reload} />
        <button
          className="btn btn-outline-primary btn-lg mt-3"
          onClick={this.startBurst}
        >
          Start Burst
        </button>
        <Pool tasks={this.props.tasks} reload={this.props.reload} />
        
      </div>
    );
  }
}

export default Prepare;
