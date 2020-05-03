import React from "react";

import HeatMapStats from "./HeatMapStats";

function Stats({ stats }) {
  return (
      <HeatMapStats graph={stats.graph} />
  );
}

export default Stats;
