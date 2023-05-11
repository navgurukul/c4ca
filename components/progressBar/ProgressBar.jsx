const ProgressBar = ({progress}) => {
  const parentDiv = {
    width: "100%",
    height: 4,
    background: "#F7F7F7",
    borderRadius: "8px",
  };

  const childDiv = {
    width: `${progress}`,
    height: "100%",
    background: "#29458C",
    borderRadius: "8px",
  };

  return (
    <div style={parentDiv}>
      <div style={childDiv}></div>
    </div>
  );
};

export default ProgressBar;
