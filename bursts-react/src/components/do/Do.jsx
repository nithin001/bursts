import React from 'react';
import { useSelector } from 'react-redux';
import { getBurstState } from '../../redux/selectors';
import Tasks from './Tasks';

function Do() {
  const burst = useSelector(getBurstState);
  if (burst.status !== 'active') {
    return <React.Fragment />;
  }

  return (
    <div className="p-3">
      <Tasks />
    </div>
  );
}

export default Do;
