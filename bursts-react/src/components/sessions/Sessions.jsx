import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getApplicationState } from '../../redux/selectors';
import { createBurst } from '../../redux/actions';
import BurstingPage from './BurstingPage';

function Work() {
  const application = useSelector(getApplicationState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!application.currentBurstId) {
      dispatch(createBurst());
    }
  }, [dispatch, application.currentBurstId]);

  return (
    <div className="container">
      <BurstingPage />
    </div>
  );
}

export default Work;
