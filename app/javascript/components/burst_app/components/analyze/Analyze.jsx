import React from "react";
import { useSelector } from "react-redux";
import { getBurstState } from "../../redux/selectors";
import Tasks from "./Tasks";
import Stats from "./Stats";

function Analyze() {
  const burst = useSelector(getBurstState);
  if (burst.status !== "completed") {
    return <React.Fragment />;
  }

  return (
    <div className="p-3">
      <Tasks />
      <Stats />
    </div>
  );
}

export default Analyze;
