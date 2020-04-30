import React from "react";

export default React.forwardRef(({ onCancel }, ref) => {
  return (
    <i
      className={`fa fa-undo fa-lg text-white ml-2`}
      aria-hidden="true"
      tabIndex="0"
      role="button"
      aria-pressed="false"
      style={{ cursor: "pointer" }}
      onClick={() => {
        ref.current.clear();
        onCancel();
      }}
      onKeyDown={(e) => {
        if (e.which === 13 || e.which === 32) {
          ref.current.clear();
          onCancel();
        }
      }}
    />
  );
});
