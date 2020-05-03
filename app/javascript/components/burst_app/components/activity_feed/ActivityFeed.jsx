import React, { useEffect } from "react";
import Bursts from "./bursts";

import { useDispatch, useSelector } from "react-redux";
import { loadActivityFeed } from "../../redux/actions";
import { getFeedState } from "../../redux/selectors";

function ActivityFeed() {
  const feed = useSelector(getFeedState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadActivityFeed());
  }, []);

  if (!feed.loaded || feed.activities.length === 0) {
    return <React.Fragment />;
  }

  return (
    <React.Fragment>
      <Bursts />
    </React.Fragment>
  );
}

export default ActivityFeed;
