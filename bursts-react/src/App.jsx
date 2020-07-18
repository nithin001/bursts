import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadPlayerBurst, loadCurrentBurst, loadCurrentUser } from './redux/actions';
import { getApplicationState, getBurstState } from './redux/selectors';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import LandingPage from './components/sessions/LandingPage';
import Sessions from './components/sessions/Session';
import Reports from './components/Reports';
import Tasks from './components/tasks/Tasks';
import Notifications from './components/notifications/Notifications';
import AddPostDatedSession from './components/post_date_session/AddPostDatedSession';

function App() {
  const dispatch = useDispatch();
  const application = useSelector(getApplicationState);
  useEffect(() => {
    dispatch(loadCurrentBurst());
    dispatch(loadCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (application.currentBurstId) {
      dispatch(loadPlayerBurst(application.currentBurstId));
    }
  }, [dispatch, application.currentBurstId]);

  if (!application.currentBurstIdLoaded || !application.currentUserLoaded) {
    return <React.Fragment>Loading</React.Fragment>;
  }

  if (application.currentBurstId && !application.currentBurstLoaded) {
    return <React.Fragment>Loading</React.Fragment>;
  }

  return (
    <Router>
      <Notifications />
      <Switch>
        <Route path="/tasks">
          <Tasks />
        </Route>
        <Route path="/add-post-dated-session">
          <AddPostDatedSession />
        </Route>
        <Route path="/sessions/:sessionId">
          <Sessions />
        </Route>
        <Route path="/reports">
          <Reports />
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
