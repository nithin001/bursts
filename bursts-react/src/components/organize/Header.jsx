import React from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { deleteBurst } from '../../redux/actions';
import IconButton from '../common/IconButton';

function Header({ burst }) {
  const history = useHistory();
  return (
    <div className="container bg-light border-bottom">
      <div className="row align-items-center justify-content-center">
        <div className="col-8 p-3 d-flex flex-column align-items-start justify-content-center">
          <h3 className="text-task mb-0">
            Session Complete!
          </h3>
          <small className="text-task">
            In
            {' '}
            {burst.humanized_time_taken}
          </small>
        </div>
        <div className="col-4 p-3 text-right">
          <IconButton
            className="fa fa-trash fa-2x text-task"
            action={() => {
              deleteBurst(burst.id);
              history.push(`/?date=${moment(burst.completed_at).format('YYYY-MM-DD')}`);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
