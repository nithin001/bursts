import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import IconButton from '../common/IconButton';
import { startBurst, completeBurst } from '../../redux/actions';
import { getApplicationState, getBurstState } from '../../redux/selectors';
import Timer from './Timer';

const stepMap = {
  draft: 'Prepare',
  active: 'Do',
  completed: 'Analyze',
};
function Bursting() {
  const dispatch = useDispatch();
  const application = useSelector(getApplicationState);
  const burst = useSelector(getBurstState);

  if (!application.currentBurstId) {
    return <React.Fragment />;
  }

  const burstMode = burst.status === 'draft' || burst.status === 'active';

  if (!burstMode) {
    return <React.Fragment />;
  }

  const actionButtonMap = {
    draft: <IconButton className="fa fa-play-circle fa-2x text-task" action={() => { startBurst(application.currentBurstId); }} />,
    active: <IconButton className="fa fa-stop-circle fa-2x text-task" action={() => { dispatch(completeBurst(application.currentBurstId)); }} />,
  };

  return (
    <div className="container border-bottom">
      <div className="row">
        <div className="col-sm-4 p-3 d-flex flex-align-center">
          <span className="p-1">{stepMap[burst.status]}</span>
        </div>
        <div className="col-sm-4 p-3 d-flex flex-align-center justify-content-center">
          {burst.status === 'active' && <Timer burst={burst} />}
        </div>
        <div className="col-sm-4 p-3 text-right">
          {actionButtonMap[burst.status]}
        </div>
      </div>
    </div>
  );
}

export default Bursting;
