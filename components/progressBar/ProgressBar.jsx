import React from "react";

const ProgressBar = ({ height, progress, bgcolor1, progressBarColor }) => {
  const parentDiv = {
    width: "100%",
    height: `${height}px`,
    background: progressBarColor,
  };

  const childDiv = {
    width: `${progress}px`,
    height: "100%",
    background: bgcolor1,
  };

  return (
    <div style={parentDiv}>
      <div style={childDiv}></div>
    </div>
  );
};

export default ProgressBar;
