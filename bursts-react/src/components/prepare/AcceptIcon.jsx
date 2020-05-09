import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '../common/IconButton';

const AcceptIcon = React.forwardRef(({ onCommit, description }, ref) => {
  const hasText = description && description.trim().length > 0;
  if (!hasText) {
    return <i className="fa fa-plus fa-lg text-inactive" />;
  }
  return (
    <IconButton
      className="fa fa-plus fa-lg text-white"
      action={() => {
        ref.current.clear();
        onCommit();
      }}
    />

  );
});

AcceptIcon.propTypes = {
  onCommit: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
};

export default AcceptIcon;
