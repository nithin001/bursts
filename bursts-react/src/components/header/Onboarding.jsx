import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { createBurst } from '../../redux/actions';
import { getApplicationState } from '../../redux/selectors';

function Onboarding() {
  const dispatch = useDispatch();
  const application = useSelector(getApplicationState);
  const firstName = application.user.name.split(' ')[0];
  if (application.currentBurstId) {
    return <React.Fragment />;
  }

  return (
    <div className="container border-bottom">
      <div className="row">
        <div className="col-sm-4 p-3 d-flex flex-align-center">
          <span className="p-1">
            {`Welcome ${firstName}`}
          </span>
        </div>
        <div className="col-sm-4" />
        <div className="col-sm-4 p-3 text-right">
          <button
            type="button"
            onClick={() => {
              dispatch(createBurst());
            }}
            className="btn btn-outline-primary btn-sm rounded-pill"
          >
            Get started
          </button>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
