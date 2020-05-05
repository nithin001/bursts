import React from 'react';
import Onboarding from './Onboarding';
import Bursting from './Bursting';
import Welcome from './Welcome';
import Congratulations from './Congratulations';

function Header() {
  return (
    <React.Fragment>
      <Onboarding />
      <Bursting />
      <Welcome />
      <Congratulations />
    </React.Fragment>
  );
}

export default Header;
