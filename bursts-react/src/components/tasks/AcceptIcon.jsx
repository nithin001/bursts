import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '../common/IconButton';

const AcceptIcon = ({ onCommit, description }) => {
  const hasText = description && description.trim().length > 0;
  if (!hasText) {
    return <i className="fa fa-check text-inactive" />;
  }
  return (
    <IconButton
      className="fa fa-check text-white"
      action={() => {
        onCommit();
      }}
    />
  );
};

AcceptIcon.propTypes = {
  onCommit: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
};

export default AcceptIcon;
