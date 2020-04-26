import React from "react";
import { AxiosInstance } from "../util";

class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  keyPress(e) {
    if (e.keyCode == 13) {
      this.addTask();
    }
  }

  addTask = () => {
    AxiosInstance()
      .post("/add.json", {
        description: this.state.value,
      })
      .then(() => {
        this.setState({ value: "" });
        this.props.reload();
      });
  };

  render() {
    return (
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          value={this.state.value}
          onKeyDown={this.keyPress}
          onChange={this.handleChange}
        />
        <small id="emailHelp" className="form-text text-muted">
          Press &#8629; to add a task
        </small>
      </div>
    );
  }
}

export default AddTask;
