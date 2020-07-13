import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import IconButton from '../common/IconButton';
import { startBurst } from '../../redux/actions';
import { getBurstState } from '../../redux/selectors';

function Bursting() {
  const dispatch = useDispatch();
  const burst = useSelector(getBurstState);

  return (
    <div className="container bg-light border-bottom">
      <div className="row align-items-center justify-content-center">
        <div className="col-sm-6 p-3 d-flex flex-column align-items-start justify-content-center">
          <h3 className="text-task mb-0">Add tasks</h3>
          <small className="text-task">
            that you plan to work on in this session
          </small>
        </div>
        <div className="col-sm-6 p-3 text-right">
          <IconButton
            className="fa fa-play-circle fa-2x text-task"
            action={() => {
              dispatch(startBurst(burst.id));
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Bursting;
