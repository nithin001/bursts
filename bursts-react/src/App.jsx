import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadCurrentBurst, loadCurrentUser, loadBurst } from "./redux/actions";
import { getApplicationState, getBurstState } from "./redux/selectors";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import LandingPage from "./components/sessions/LandingPage";
import Sessions from "./components/sessions/Sessions";
import Reports from "./components/Reports";
import Tasks from "./components/tasks/Tasks";
import Notifications from "./components/notifications/Notifications";

function App() {
  const dispatch = useDispatch();
  const application = useSelector(getApplicationState);
  const burst = useSelector(getBurstState);
  useEffect(() => {
    dispatch(loadCurrentBurst());
    dispatch(loadCurrentUser());
  }, [dispatch, burst.status]);

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

  return (
    <Router>
      <Notifications />
      <Switch>
        <Route path="/tasks">
          <Tasks />
        </Route>
        <Route path="/sessions">
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
