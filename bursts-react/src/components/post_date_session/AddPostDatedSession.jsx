import React, { useCallback, useState } from 'react';

import Tasks from './Tasks';
import Header from './Header';
import './dropdown.scss';
import useQuery from '../common/useQuery';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { createPostDatedSession } from '../../redux/actions';

function AddPostDatedSession() {
  const history = useHistory();
  const [works, setWorks] = useState([]);
  const [startedAt, setStartedAt] = useState({ label: '09:00', value: '540' });
  const [completedAt, setCompletedAt] = useState({ label: '09:15', value: '555' });

  const query = useQuery();
  const chosenDate = moment(query.get('date')).isValid() ? moment(query.get('date')) : moment();
  const [date, setDate] = useState(chosenDate);

  const createWork = useCallback((id) => {
    setWorks([...works, id]);
  }, [works, setWorks]);

  const deleteWork = useCallback((id) => {
    const updatedWorks = works.filter(workId => workId !== id);
    setWorks(updatedWorks);
  }, [works, setWorks]);

  const onCommit = () => {
    createPostDatedSession(works, startedAt.value, completedAt.value, date.format('YYYY-MM-DD')).then(() => {
      history.push(`/?date=${date.format('YYYY-MM-DD')}`);
    });
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-10 clearfix">
          <div className="container">
            <div className="p-3">
              <Header
                date={date}
                setDate={setDate}
                startedAt={startedAt}
                completedAt={completedAt}
                setStartedAt={setStartedAt}
                setCompletedAt={setCompletedAt}
                onCommit={onCommit}
              />
              <Tasks works={works} createWork={createWork} deleteWork={deleteWork} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPostDatedSession;
