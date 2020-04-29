import React from "react";
import { useSelector } from "react-redux";
import { getBurstState } from "../../redux/selectors";
import Tasks from "./Tasks";

function Analyze() {
  const burst = useSelector(getBurstState);
  if (burst.status !== "completed") {
    return <React.Fragment />;
  }
  
  return (
    <div className="p-3">
      <Tasks />
    </div>
  );
}

export default Analyze;
