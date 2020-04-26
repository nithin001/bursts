import React from "react";
import moment from "moment";

class PreviousBurst extends React.Component {
  render() {
    if (!this.props.burst) {
      return <React.Fragment />;
    }

    const hoursTaken = moment(this.props.burst.completed_at).diff(
      this.props.burst.started_at,
      "hours"
    ); // 1

    const minutesTaken =
      moment(this.props.burst.completed_at).diff(
        this.props.burst.started_at,
        "minutes"
      ) % 60;

    var timeTaken = "";
    if (hoursTaken) {
      timeTaken += `${hoursTaken} hours`;
    }
    if (minutesTaken) {
      timeTaken += `${minutesTaken} minutes`;
    }

    if (timeTaken == "") {
      timeTaken = "very less time";
    }
    
    return (
      <div className="alert alert-info mt-5" role="alert">
        You completed your <a href={`/bursts/${this.props.burst.id}`}>previous burst</a> in {timeTaken}
      </div>
    );
  }
}

export default PreviousBurst;
