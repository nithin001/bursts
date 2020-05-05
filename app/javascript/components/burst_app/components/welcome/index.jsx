import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBurst } from "../../redux/actions";
import { getBurstState } from "../../redux/selectors";

import Engineer from "images/undraw_new_ideas_jdea";

function Welcome() {
  const burst = useSelector(getBurstState);
  const dispatch = useDispatch();

  if (burst.status !== "notified") {
    return <React.Fragment />;
  }

  return (
    <div className="welcome-page flex-column align-items-center justify-content-center text-center text-white p-5">
      <h2 className="thin">Welcome back!</h2>
      <img src={Engineer} width="500" className="mt-5" />
      <p class="lead mt-5">Are you ready for another burst?</p>
      <div className="mt-3">
        <button
          type="button"
          onClick={() => {
            dispatch(createBurst());
          }}
          className="btn btn-outline-light btn-lg rounded-pill"
        >
          Start now
        </button>
      </div>
    </div>
  );
}

export default Welcome;
