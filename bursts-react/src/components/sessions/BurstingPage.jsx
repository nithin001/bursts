import React from 'react';
import Prepare from '../prepare/Prepare';
import Do from '../do/Do';
import Organize from '../organize/Organize';

function BurstingPage() {
  return (
    <div className="row justify-content-center">
      <div className="col-10 clearfix">
        <div className="shadow burst-container rounded bg-white mt-5">
          <Prepare />
          <Do />
          <Organize />
        </div>
      </div>
    </div>
  );
}

export default BurstingPage;
