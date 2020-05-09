import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '../common/IconButton';

const CancelIcon = ({ onCancel }) => (
  <IconButton
    className="fa fa-undo text-white ml-2"
    action={() => {
      onCancel();
    }}
  />
);

CancelIcon.propTypes = {
  onCancel: PropTypes.func.isRequired,
};

export default CancelIcon;
