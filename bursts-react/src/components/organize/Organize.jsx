import React from 'react';
import { useSelector } from 'react-redux';
import { getBurstState } from '../../redux/selectors';
import Tasks from './Tasks';
import Header from './Header';

function Organize() {
  const burst = useSelector(getBurstState);
  if (burst.status !== 'completed') {
    return <React.Fragment />;
  }

  return (
    <React.Fragment>
      <Header burst={burst} />
      <div className="p-3">
        <Tasks />
      </div>
    </React.Fragment>
  );
}

export default Organize;
