import React from "react";
import { useSelector } from "react-redux";
import { ReactComponent as Sessions } from "../assets/images/checklist_isometric.svg";
import { ReactComponent as WorkDays } from "../assets/images/graphic_chart_isometric.svg";
import IconButton from "./common/IconButton";
import { withRouter } from "react-router-dom";
import { getApplicationState } from "../redux/selectors";

function LandingPage({ history }) {
  const application = useSelector(getApplicationState);
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-5 clearfix">
          <div className="shadow burst-container rounded bg-light mt-5 w-100">
            <div
              className="d-flex flex-column align-items-center justify-content-center w-100 position-relative"
              style={{ minHeight: 400 }}
            >
              <div className="w-100">
                <Sessions />
              </div>
              <div
                className="w-75 d-flex justify-content-center align-items-center bg-task position-absolute pl-3 pr-3 rounded-pill shadow"
                style={{ bottom: -25, height: 50 }}
              >
                <span className="text-light font-weight-bold">
                  {application.currentBurstId
                    ? "Continue session"
                    : "Start a session"}
                </span>
                <IconButton
                  className="fa fa-arrow-circle-right text-white stretched-link ml-2"
                  action={() => {
                    history.push("/sessions");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-5 clearfix">
          <div className="shadow burst-container rounded bg-light mt-5 w-100">
            <div
              className="d-flex flex-column align-items-center justify-content-center w-100 position-relative"
              style={{ minHeight: 400 }}
            >
              <div className="w-100">
                <WorkDays />
              </div>
              <div
                className="w-75 d-flex justify-content-center align-items-center bg-task position-absolute pl-3 pr-3 rounded-pill shadow"
                style={{ bottom: -25, height: 50 }}
              >
                <span className="text-light font-weight-bold">
                  View reports
                </span>
                <IconButton
                  className="fa fa-arrow-circle-right text-white stretched-link ml-2"
                  action={() => {
                    history.push("/reports");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(LandingPage);
