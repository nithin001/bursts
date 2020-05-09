import React, { useEffect, useCallback } from "react";
import moment from "moment";
import { getBurstState, getBurstsState } from "../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { loadBursts } from "../../redux/actions";
import InfiniteScroll from "react-infinite-scroller";
import Task from "./Task";

function Work() {
  const burst = useSelector(getBurstState);
  const burstsState = useSelector(getBurstsState);
  const dispatch = useDispatch();

  const loader = useCallback(
    (page) => {
      dispatch(loadBursts(page));
    },
    [dispatch]
  );

  useEffect(() => {
    loader(1);
  }, []);

  if (!burstsState.loaded) {
    return <React.Fragment />;
  }

  if (burst.status === "active" || burst.status === "draft") {
    return <React.Fragment />;
  }
  const bursts = burstsState.bursts;
  const hasMore = bursts.length < burstsState.count;

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-10 clearfix">
          <InfiniteScroll
            pageStart={1}
            loadMore={(page) => loader(page)}
            hasMore={hasMore}
            loader={<div />}
          >
            {bursts.map((burst) => {
              const date = moment(burst.humanized_completed_at);
              return (
                <div className="container rounded shadow p-3 text-task mt-3 mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="pl-1 mb-0 text-muted">
                      {date.format("dddd")}, {date.format("DD MMMM")}
                    </h4>
                    <div>
                      <small>
                        {burst.humanized_from_to} ({burst.humanized_time_taken})
                      </small>
                    </div>
                  </div>
                  {burst.works.map((work) => (
                    <Task task={work.task} work={work} />
                  ))}
                </div>
              );
            })}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}

export default Work;
