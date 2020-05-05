import React from 'react';

import Dots from 'react-carousel-dots';
import { useDispatch } from 'react-redux';
import Engineer from '../../assets/images/undraw_personal_goals_edgd.svg';
import { createBurst } from '../../redux/actions';

function Page3() {
  const dispatch = useDispatch();

  return (
    <div className="page page--3 d-flex flex-column align-items-center justify-content-center p-5">
      <div className="page__image">
        <img src={Engineer} width="300" alt="engineer working with data and images" />
      </div>
      <div className="mt-5">
        <p className="text-white text-center lead">
          Go bonkers on data! Analyze and optimize how you spend your work day.
        </p>
      </div>
      <Dots length={3} active={2} size={10} margin={5} />
      <div className="mt-3">
        <button
          type="button"
          onClick={() => {
            dispatch(createBurst());
          }}
          className="btn btn-outline-light btn-lg rounded-pill"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Page3;
