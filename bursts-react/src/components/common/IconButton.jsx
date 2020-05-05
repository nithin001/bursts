import React from 'react';
import PropTypes from 'prop-types';

function IconButton({ className, action }) {
  return (
    <i
      className={className}
      aria-hidden="true"
      tabIndex="0"
      role="button"
      aria-pressed="false"
      style={{ cursor: 'pointer' }}
      onClick={(e) => {
        e.preventDefault();
        action();
      }}
      onKeyDown={(e) => {
        if (e.which === 13 || e.which === 32) {
          e.preventDefault();
          action();
        }
      }}
    />
  );
}

IconButton.propTypes = {
  className: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};


export default IconButton;
