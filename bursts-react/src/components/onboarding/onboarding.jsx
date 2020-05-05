import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getApplicationState } from '../../redux/selectors';

import './onboarding.scss';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';

function Onboarding() {
  const application = useSelector(getApplicationState);
  const [page, setPage] = useState(0);

  const nextPage = () => {
    setPage(page + 1);
  };
  if (application.currentBurstId) {
    return <React.Fragment />;
  }

  const pages = [
    <Page1 nextPage={nextPage} />,
    <Page2 nextPage={nextPage} />,
    <Page3 nextPage={nextPage} />,
  ];
  return pages[page];
}

export default Onboarding;
