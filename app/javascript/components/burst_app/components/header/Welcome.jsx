import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { startBurst, completeBurst, createBurst } from "../../redux/actions";
import { getApplicationState, getBurstState } from "../../redux/selectors";

function Welcome() {
  const dispatch = useDispatch();
  const application = useSelector(getApplicationState);
  const burst = useSelector(getBurstState);

  if (!application.currentBurstId) {
    return <React.Fragment />;
  }

  const prepareMode = burst.status === "notified";

  if (!prepareMode) {
    return <React.Fragment />;
  }

  const firstName = application.user.name.split(" ")[0];
  return (
    <div className="container border-bottom">
      <div className="row">
        <div className="col-sm-4 p-3 d-flex flex-align-center">
          <span className="p-1">Idle</span>
        </div>
        <div className="col-sm-4"></div>
        <div className="col-sm-4 p-3 text-right">
          <i
            className={`fa fa-plus-circle fa-2x text-task`}
            aria-hidden="true"
            tabIndex="0"
            role="button"
            aria-pressed="false"
            style={{ cursor: "pointer" }}
            onClick={() => {
              dispatch(createBurst());
            }}
            onKeyDown={(e) => {
              if (e.which === 13 || e.which === 32) {
                dispatch(createBurst());
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Welcome;
