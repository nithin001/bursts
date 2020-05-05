import React from 'react';
import Dots from 'react-carousel-dots';
import PropTypes from 'prop-types';
import Engineer from '../../assets/images/undraw_progress_tracking_7hvk.svg';

function Page2({ nextPage }) {
  return (
    <div className="page page--2 d-flex flex-column align-items-center justify-content-center p-5">
      <div className="page__image">
        <img src={Engineer} width="300" alt="Engineer sharing progress with team" />
      </div>
      <div className="mt-5">
        <p className="text-white text-center lead">
          Share your progress easily. It is just copy and paste!
        </p>
      </div>
      <Dots length={3} active={1} size={10} margin={5} />
      <div className="mt-3">
        <button type="button" onClick={nextPage} className="btn btn-outline-light btn-lg rounded-pill">Continue</button>
      </div>
    </div>
  );
}

Page2.propTypes = {
  nextPage: PropTypes.func.isRequired,
};
export default Page2;
