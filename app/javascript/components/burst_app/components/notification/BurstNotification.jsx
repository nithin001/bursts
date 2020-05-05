import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBurstNotified } from "../../redux/actions";
import { createBurst } from "../../redux/actions";
import { getBurstState } from "../../redux/selectors";
import "./burst_notification.scss";

import Engineer from "images/undraw_High_five_u364";

function BurstNotification() {
  const burst = useSelector(getBurstState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (burst && burst.status == "completed") {
      dispatch(updateBurstNotified(burst.id));
    }
  }, [burst]);

  if (burst.status !== "completed") {
    return <React.Fragment />;
  }

  return (
    <div className="burst-notification flex-column align-items-center justify-content-center text-center text-white p-5">
      <div className="row align-items-center justify-content-center">
        <div className="col-9 ">
          <h2 className="thin">Congratulations on finishing the burst!</h2>
          <img src={Engineer} width="500" className="mt-5" />
          <p class="lead mt-3">You deserve a hard earned break. Go for it!</p>
          <div className="mt-5">
            <button
              type="button"
              onClick={() => {
                dispatch(createBurst());
              }}
              className="btn btn-outline-light btn-lg rounded-pill"
            >
              Start another burst
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BurstNotification;
