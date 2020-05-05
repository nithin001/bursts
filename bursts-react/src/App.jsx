import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCurrentBurst, loadCurrentUser, loadBurst } from './redux/actions';
import { getApplicationState, getBurstState } from './redux/selectors';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import LandingPage from './components/LandingPage';

function App() {
  const dispatch = useDispatch();
  const application = useSelector(getApplicationState);
  const burst = useSelector(getBurstState);
  useEffect(() => {
    dispatch(loadCurrentBurst());
    dispatch(loadCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (application.currentBurstId) {
      dispatch(loadBurst(application.currentBurstId));
    }
  }, [dispatch, application.currentBurstId]);

  if (!application.currentBurstLoaded || !application.currentUserLoaded) {
    return <React.Fragment>Loading</React.Fragment>;
  }

  if (application.currentBurstId && !burst.loaded) {
    return <React.Fragment>Loading</React.Fragment>;
  }

  return <LandingPage />;
}

export default App;
