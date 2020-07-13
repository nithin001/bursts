import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import IconButton from '../common/IconButton';
import { addNotification, completeBurst } from '../../redux/actions';
import { getBurstState } from '../../redux/selectors';
import Timer from './Timer';

function Header({ history }) {
  const dispatch = useDispatch();
  const burst = useSelector(getBurstState);

  return (
    <div className="container bg-light border-bottom">
      <div className="row align-items-center justify-content-center">
        <div className="col-8 p-3 d-flex flex-column align-items-start justify-content-center">
          <h3 className="text-task mb-0">
            <Timer burst={burst} />
          </h3>
          <small className="text-task">
            Click the checkbox once for the tasks you worked on and twice for
            the tasks you've completed
          </small>
        </div>
        <div className="col-4 p-3 text-right">
          <IconButton
            className="fa fa-stop-circle fa-2x text-task"
            action={() => {
              dispatch(completeBurst(burst.id));
              dispatch(
                addNotification({
                  message: 'Congratulations on finishing the session!',
                  id: `burst-${burst.id}-completed`,
                }),
              );
              history.push('/');
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default withRouter(Header);
