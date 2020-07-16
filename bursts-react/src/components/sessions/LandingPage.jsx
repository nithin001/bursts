import React, { useCallback, useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import RailsTimeZone from 'rails-timezone';
import { loadBursts } from '../../redux/actions';
import { getBurstsState, getBurstState, getApplicationState } from '../../redux/selectors';

function Work() {
  const burst = useSelector(getBurstState);
  const applicationState = useSelector(getApplicationState);
  const burstsState = useSelector(getBurstsState);
  const dispatch = useDispatch();

  const timezone = RailsTimeZone.from(applicationState.user.timezone);

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

  const transformedBursts = bursts
    .filter(burstObj => burstObj.status === 'completed')
    .map(burstObj => ({
      start: burstObj.started_at,
      end: burstObj.completed_at,
      url: `/sessions/${burstObj.id}`,
    }));

  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-10 clearfix">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            themeSystem="bootstrap"
            events={transformedBursts}
            eventContent={renderEventContent}
            displayEventEnd
            eventDisplay="block"
            dayMaxEvents
            timezone={timezone}
          />

          {false
          && (
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
          )}
        </div>
      </div>
    </div>
  );
}

export default Work;
