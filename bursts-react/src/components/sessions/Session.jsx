import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useParams,
} from 'react-router-dom';
import { getBurstState } from '../../redux/selectors';
import { loadBurst } from '../../redux/actions';
import BurstingPage from './BurstingPage';

function Session() {
  const { sessionId } = useParams();
  const burst = useSelector(getBurstState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadBurst(sessionId));
  }, [dispatch, sessionId]);

  if (!burst) {
    return <React.Fragment />;
  }

  return (
    <div className="container">
      <BurstingPage />
    </div>
  );
}

export default Session;
