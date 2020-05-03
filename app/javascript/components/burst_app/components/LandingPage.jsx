import React from "react";
import Onboarding from "./onboarding/onboarding";
import Header from "./header/Header";
import Prepare from "./prepare/Prepare";
import Do from "./do/Do";
import Analyze from "./analyze";
import ActivityFeed from "./activity_feed/ActivityFeed";
import BurstNotification from "./notification/BurstNotification";
import Welcome from "./welcome";

function LandingPage() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-10 clearfix">
          <div className="shadow burst-container rounded bg-white mt-5">
            <Header />
            <Onboarding />
            <Prepare />
            <Do />
          </div>
        </div>
        <div className="col-10 clearfix">
          <BurstNotification />
          <Welcome />
          <Analyze />
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
