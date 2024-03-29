import React, { useCallback, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import { useDispatch, useSelector } from 'react-redux';
import Bursts from './Bursts';
import { loadActivityFeed } from '../../redux/actions';
import { getBurstState, getDatesState, getFeedState } from '../../redux/selectors';
import FeedHeader from './FeedHeader';

function ActivityFeed() {
  const feed = useSelector(getFeedState);
  const dates = useSelector(getDatesState);
  const burst = useSelector(getBurstState);

  const dispatch = useDispatch();
  const loader = useCallback(
    (page, clearOnLoad) => {
      dispatch(loadActivityFeed(dates, page, clearOnLoad));
    },
    [dispatch, dates],
  );

  useEffect(() => {
    loader(1, true);
  }, [loader, burst.status]);


  if (!feed.loaded) {
    return <React.Fragment />;
  }

  const hasMore = feed.activities.length < feed.total_activities;

  return (
    <div>
      <FeedHeader />
      <InfiniteScroll
        pageStart={1}
        loadMore={page => loader(page, false)}
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
