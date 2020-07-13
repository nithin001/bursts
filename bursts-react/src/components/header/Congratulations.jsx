import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createBurst } from '../../redux/actions';
import { getApplicationState, getBurstState } from '../../redux/selectors';
import IconButton from '../common/IconButton';

function Congratulations() {
  const dispatch = useDispatch();
  const application = useSelector(getApplicationState);
  const burst = useSelector(getBurstState);

  if (!application.currentBurstId) {
    return <React.Fragment />;
  }

  const notifyMode = burst.status === 'completed';

  if (!notifyMode) {
    return <React.Fragment />;
  }

  return (
    <div className="container border-bottom">
      <div className="row">
        <div className="col-sm-4 p-3 d-flex flex-align-center">
          <span className="p-1">Completed</span>
        </div>
        <div className="col-sm-4" />
        <div className="col-sm-4 p-3 text-right">
          <IconButton
            className="fa fa-plus-circle fa-2x text-task"
            action={() => {
              dispatch(createBurst());
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Congratulations;
