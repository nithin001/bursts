import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '../common/IconButton';

const CancelIcon = React.forwardRef(({ onCancel }, ref) => (
  <IconButton
    className="fa fa-undo fa-lg text-white ml-2"
    action={() => {
      ref.current.clear();
      onCancel();
    }}
  />
));

CancelIcon.propTypes = {
  onCancel: PropTypes.func.isRequired,
};

export default CancelIcon;
