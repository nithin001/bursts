import React from 'react';
import { useSelector } from 'react-redux';
import { getBurstState } from '../../redux/selectors';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';
import Tasks from './Tasks';
import AddTask from './AddTask';

function Prepare() {
  const burst = useSelector(getBurstState);
  if (burst.status !== 'draft') {
    return <React.Fragment />;
  }

  return (
    <div className="p-3">
      <AddTask />
      <Tasks />
    </div>
  );
}

export default Prepare;
