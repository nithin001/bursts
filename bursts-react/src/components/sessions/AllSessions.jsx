import React, { useCallback, useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { loadBursts } from '../../redux/actions';
import { getBurstsState } from '../../redux/selectors';
import Calendar from './Calendar';

function Work() {
  const burstsState = useSelector(getBurstsState);
  const dispatch = useDispatch();

  const loader = useCallback(
    (page) => {
      dispatch(loadBursts(page));
    },
    [dispatch],
  );

  useEffect(() => {
    loader(1);
  }, [loader]);

  if (!burstsState.loaded) {
    return <React.Fragment />;
  }

  const { bursts } = burstsState;
  const hasMore = bursts.length < burstsState.count;

  // const transformedBursts = bursts
  //   .filter(burstObj => burstObj.status === 'completed')
  //   .map(burstObj => ({
  //     start: burstObj.started_at,
  //     end: burstObj.completed_at,
  //     url: `/sessions/${burstObj.id}`,
  //   }));


  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-10 clearfix">
          <div className="container p-3">
            <div className="row">
              <div className="col-6">
                <Calendar />
              </div>
              <div className="col-6">
                <div className="container p-3 border rounded" />
              </div>
            </div>
          </div>
        </div>

        {false
        && (
          <div className="col-10 clearfix">
            <InfiniteScroll
              pageStart={1}
              loadMore={page => loader(page)}
              hasMore={hasMore}
              loader={<div />}
            >
              {bursts.map((burstObj) => {
                const date = moment(burstObj.humanized_completed_at);
                return (
                  <div className="container rounded shadow p-3 text-task mt-3 mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4 className="pl-1 mb-0 text-muted">
                        {burstObj.humanized_from_to}
                      </h4>
                      <div>
                        <small>
                          {date.format('dddd')}
                          ,
                          {date.format('DD MMMM')}
                          {' '}
                          (
                          {burstObj.humanized_time_taken}
                          )
                        </small>
                      </div>
                    </div>
                  </div>
                );
              })}
            </InfiniteScroll>
          </div>
        )}
      </div>
    </div>
  );
}

export default Work;
