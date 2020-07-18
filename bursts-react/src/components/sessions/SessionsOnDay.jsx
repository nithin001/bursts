import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Link,
  useHistory,
} from 'react-router-dom';
import * as moment from 'moment';
import { loadBursts } from '../../redux/actions';
import { getBurstsState } from '../../redux/selectors';

function SessionsOnDay({ chosenDate }) {
  const burstsState = useSelector(getBurstsState);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    if (chosenDate) {
      dispatch(loadBursts(chosenDate.format('YYYY-MM-DD')));
    }
  }, [dispatch, chosenDate]);

  if (!burstsState.loaded) {
    return <React.Fragment />;
  }

  const { bursts } = burstsState;


  return (
    <div className="container border rounded p-3">
      <h5>
        Sessions on
        {chosenDate.format(' MMMM Do, YYYY')}
      </h5>
      {bursts.length === 0 && <div className="mt-3" style={{ minHeight: 150 }}>You did not log any sessions</div>}
      {bursts.length !== 0 && (
      <div className="mt-3" style={{ minHeight: 150 }}>
        {bursts.map(burstObj => (
          <Link className="badge badge-primary mr-2 p-2 mb-2" to={`/sessions/${burstObj.id}`}>{burstObj.humanized_from_to}</Link>
        ))}
      </div>
      )}
      {chosenDate.isBefore(moment(), 'day') && (
      <div>
        <p>Did you miss tracking a session? We've got you covered!</p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            history.push(`/add-post-dated-session?date=${chosenDate.format('YYYY-MM-DD')}`);
          }}
        >
          Add a post dated session
        </button>
      </div>
      )}
    </div>
  );
}

export default SessionsOnDay;
