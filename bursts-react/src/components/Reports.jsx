import React from "react";
import Analyze from "./analyze";
import ActivityFeed from "./activity_feed/ActivityFeed";

function Reports() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-10 clearfix">
          <Analyze />
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}

export default Reports;
