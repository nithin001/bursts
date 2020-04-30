import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { startBurst, completeBurst, createBurst } from "../../redux/actions";
import { getApplicationState, getBurstState } from "../../redux/selectors";
import Timer from "./Timer";

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
      <i
        className={`fa fa-play-circle fa-2x text-task`}
        aria-hidden="true"
        tabIndex="0"
        role="button"
        aria-pressed="false"
        style={{ cursor: "pointer" }}
        onClick={() => {
          dispatch(startBurst(application.currentBurstId));
        }}
        onKeyDown={(e) => {
          if (e.which === 13 || e.which === 32) {
            dispatch(startBurst(application.currentBurstId));
          }
        }}
      />
    ),
    active: (
      <i
        className={`fa fa fa-stop-circle fa-2x text-task`}
        aria-hidden="true"
        tabIndex="0"
        role="button"
        aria-pressed="false"
        style={{ cursor: "pointer" }}
        onClick={() => {
          dispatch(completeBurst(application.currentBurstId));
        }}
        onKeyDown={(e) => {
          if (e.which === 13 || e.which === 32) {
            dispatch(completeBurst(application.currentBurstId));
          }
        }}
      />
    ),
    completed: (
      <button
        onClick={() => {
          dispatch(createBurst());
        }}
        className="btn btn-outline-primary btn-sm rounded-pill"
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
        <div className="col-sm-4 p-3 d-flex flex-align-center justify-content-center">
          <Timer burst={burst} />
        </div>
        <div className="col-sm-4 p-3 text-right">
          {actionButtonMap[burst.status]}
        </div>
      </div>
    </div>
  );
}

export default Bursting;
