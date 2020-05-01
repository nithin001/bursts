import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { loadStats } from "../../redux/actions";
import { getStatsState } from "../../redux/selectors";
import HeatMapStats from "./HeatMapStats";

function Stats() {
  const dispatch = useDispatch();
  const stats = useSelector(getStatsState);
  useEffect(() => {
    dispatch(loadStats());
  }, []);

  if (!stats.loaded) {
    return <div className="p-3"></div>;
  }

  return (
    <div className="p-3">
      <HeatMapStats graph={stats.graph} />
    </div>
  );
}

export default Stats;
