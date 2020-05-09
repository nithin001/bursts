import React from "react";
import Prepare from "../prepare/Prepare";
import Do from "../do/Do";
import { getBurstState } from "../../redux/selectors";
import { useSelector } from "react-redux";

function BurstingPage() {
  const burst = useSelector(getBurstState);

  if (burst.status === "completed" || burst.status === "notified") {
    return <React.Fragment />;
  }

  return (
    <div className="row justify-content-center">
      <div className="col-10 clearfix">
        <div className="shadow burst-container rounded bg-white mt-5">
          <Prepare />
          <Do />
        </div>
      </div>
    </div>
  );
}

export default BurstingPage;
