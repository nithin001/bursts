import React from "react";
import Engineer from "images/undraw_process_e90d";
import Dots from 'react-carousel-dots';

function Page1({ nextPage }) {
  return (
    <div className="page page--1 d-flex flex-column align-items-center justify-content-center p-5">
      <div className="page__image">
        <img src={Engineer} width="300" />
      </div>
      <div className="mt-5">
        <p className="text-white text-center lead">
          Break your work down into tiny, accountable steps. Complete them and
          repeat!
        </p>
      </div>
      <Dots length={3} active={0} size={10} margin={5} />
      <div className="mt-3">
        <button
          type="button"
          onClick={nextPage}
          className="btn btn-outline-light btn-lg rounded-pill"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
export default Page1;
