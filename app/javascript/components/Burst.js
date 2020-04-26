import React from "react";
import { AxiosInstance } from "./util";

import Prepare from "./prepare/Prepare";
import Running from "./running/Running";
import PreviousBurst from './previous_burst/PreviousBurst';

class Burst extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: {}, loaded: false };
    this.loadCurrentBurst = this.loadCurrentBurst.bind(this);
    this.reload = this.reload.bind(this);
  }

  componentDidMount() {
    this.loadCurrentBurst();
  }

  reload() {
    this.loadCurrentBurst();
  }

  loadCurrentBurst() {
    AxiosInstance()
      .get("/current.json")
      .then((response) => {
        this.setState({ data: response.data, loaded: true });
      });
  }

  render() {
    if (!this.state.loaded) {
      return <React.Fragment>Loading</React.Fragment>;
    }

    return (
      <>
        <PreviousBurst burst={this.state.data.last_completed_burst} />
        <Prepare
          burst={this.state.data.burst}
          tasks={this.state.data.tasks}
          reload={this.reload}
        />
        <Running burst={this.state.data.burst} reload={this.reload} />
      </>
    );
  }
}

export default Burst;
