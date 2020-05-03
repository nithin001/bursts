import React from "react";
import { useSelector } from "react-redux";
import { getBurstState } from "../../redux/selectors";
import SmallStats from "../common/SmallStats";
import { Card, CardBody } from "shards-react";

function Statistics() {
  const burst = useSelector(getBurstState);
  if (burst.status !== "completed") {
    return <React.Fragment />;
  }
  const stats = {
    label: "Hours worked",
    value: "1000",
    percentage: "4.7%",
    increase: true,
    chartLabels: [null, null, null, null, null, null, null],
    attrs: { md: "2", sm: "2" },
    datasets: [
      {
        label: "Today",
        fill: "start",
        borderWidth: 1.5,
        backgroundColor: "rgba(0, 184, 216, 0.1)",
        borderColor: "rgb(0, 184, 216)",
        data: [1, 2, 2, 3, 5, 4, 7],
      },
    ],
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-4 pt-5">
            <SmallStats
              id={`small-stats-1`}
              variation="1"
              chartData={stats.datasets}
              chartLabels={stats.chartLabels}
              label={stats.label}
              value={stats.value}
            />
          </div>
          <div className="col-4 pt-5">
            <div class="stats-small stats-small--1 card card-small">
              <div class="p-0 d-flex card-body">
                <div class="d-flex flex-column m-auto">
                  <div class="stats-small__data text-center">
                    <span class="stats-small__label text-uppercase">
                      AVERAGE BURSTS
                    </span>
                    <h6 class="stats-small__value count my-3">2</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4 pt-5">
            <div class="stats-small stats-small--1 card card-small">
              <div class="p-0 d-flex card-body">
                <div class="d-flex flex-column m-auto">
                  <div class="stats-small__data text-center">
                    <span class="stats-small__label text-uppercase">
                      AVERAGE BURST TIME
                    </span>
                    <h6 class="stats-small__value count my-3">2 HRS</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </React.Fragment>
  );
}

export default Statistics;
