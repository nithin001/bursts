import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { startBurst, completeBurst, createBurst } from "../../redux/actions";
import { getApplicationState, getBurstState } from "../../redux/selectors";

const stepMap = {
  draft: "Prepare",
  active: "Do",
  completed: "Analyze",
};
function Bursting() {
  const dispatch = useDispatch();
  const application = useSelector(getApplicationState);
  const burst = useSelector(getBurstState);

  if (!application.currentBurstId) {
    return <React.Fragment />;
  }

  const actionButtonMap = {
    draft: (
      <button
        onClick={() => {
          dispatch(startBurst(application.currentBurstId));
        }}
        className="btn btn-outline-primary btn-sm"
      >
        Start Burst
      </button>
    ),
    active: (
      <button
        onClick={() => {
          dispatch(completeBurst(application.currentBurstId));
        }}
        className="btn btn-outline-primary btn-sm"
      >
        Complete Burst
      </button>
    ),
    completed: (
      <button
        onClick={() => {
          dispatch(createBurst());
        }}
        className="btn btn-outline-primary btn-sm"
      >
        Start over
      </button>
    ),
  };

  return (
    <div className="container border-bottom">
      <div className="row">
        <div className="col-sm-4 p-3 d-flex flex-align-center">
          <span className="p-1">{stepMap[burst.status]}</span>
        </div>
        <div className="col-sm-4"></div>
        <div className="col-sm-4 p-3 text-right">
          {actionButtonMap[burst.status]}
        </div>
      </div>
    </div>
  );
}

export default Bursting;
