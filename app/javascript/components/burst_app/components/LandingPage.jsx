import React from "react";
import Onboarding from "./onboarding/onboarding";
import Header from "./header/Header";
import Prepare from "./prepare/Prepare";
import Do from "./do/Do";
import Analyze from "./analyze/Analyze";

function LandingPage() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-8">
          <div className="shadow burst-container rounded bg-white mt-5">
            <Header />
            <Onboarding />
            <Prepare />
            <Do />
            <Analyze />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
