import React from "react";

export default React.forwardRef(({ onCommit, description }, ref) => {
  const hasText = description && description.trim().length > 0;
  if (!hasText) {
    return <i className={`fa fa-check fa-lg text-inactive`} />;
  }
  return (
    <i
      className={`fa fa-check fa-lg text-white`}
      aria-hidden="true"
      tabIndex="0"
      role="button"
      aria-pressed="false"
      style={{ cursor: "pointer" }}
      onClick={() => {
        ref.current.clear();
        onCommit();
      }}
      onKeyDown={(e) => {
        if (e.which === 13 || e.which === 32) {
          ref.current.clear();
          onCommit();
        }
      }}
    />
  );
});
