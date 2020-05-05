import React, { useEffect, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import { useDispatch, useSelector } from 'react-redux';
import Bursts from './Bursts';
import { loadActivityFeed } from '../../redux/actions';
import { getFeedState, getDatesState } from '../../redux/selectors';
import FeedHeader from './FeedHeader';

function ActivityFeed() {
  const feed = useSelector(getFeedState);
  const dates = useSelector(getDatesState);
  const dispatch = useDispatch();
  const loader = useCallback(
    (page) => {
      dispatch(loadActivityFeed(dates, page));
    },
    [dispatch, dates],
  );

  useEffect(() => {
    loader(0);
  }, [loader]);

  if (!feed.loaded || feed.activities.length === 0) {
    return <React.Fragment />;
  }

  const hasMore = feed.activities.length < feed.total_activities;

  return (
    <div>
      <FeedHeader />
      <InfiniteScroll
        pageStart={0}
        loadMore={page => loader(page)}
        hasMore={hasMore}
        loader={(
          <div />
        )}
      >
        <Bursts />
      </InfiniteScroll>
    </div>
  );
}

export default ActivityFeed;
