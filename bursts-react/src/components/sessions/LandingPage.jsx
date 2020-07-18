import React from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import Calendar from './Calendar';
import SessionsOnDay from './SessionsOnDay';
import useQuery from '../common/useQuery';
import { getApplicationState } from '../../redux/selectors';
import { createBurst } from '../../redux/actions';


function LandingPage() {
  const history = useHistory();
  const query = useQuery();
  const dispatch = useDispatch();
  const chosenDate = moment(query.get('date')).isValid() ? moment(query.get('date')) : moment();
  const applicationState = useSelector(getApplicationState);
  const onChangeDay = (day) => {
    history.push(`?date=${day.format('YYYY-MM-DD')}`);
  };
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-10 clearfix">
          {applicationState.currentBurstId && (
          <button
            type="button"
            className="btn btn-large btn-primary"
            onClick={() => {
              history.push(`/sessions/${applicationState.currentBurstId}`);
            }}
          >
            Continue Session
          </button>
          )}
          {!applicationState.currentBurstId && (
            <button
              type="button"
              className="btn btn-large btn-primary"
              onClick={() => {
                dispatch(createBurst());
              }}
            >
              Start a new session
            </button>
          )}

          <div className="container p-3">
            <div className="row" />
            <div className="row">
              <div className="col-5">
                <Calendar onChangeDay={onChangeDay} chosenDate={chosenDate} />
              </div>
              <div className="col-7">
                <SessionsOnDay chosenDate={chosenDate} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
