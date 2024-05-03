import React from "react";

const Progress = ({ assignments, index }) => {
  return (
    <div className="w-full flex gap-2 items-center">
      {assignments.map((assignment, i) => (
        <Single key={i} assignment={assignment} current={i === index} />
      ))}
    </div>
  );
};

const Single = ({ assignment, current }) => {
  return (
    <div
      className="single-progress flex flex-grow h-4 rounded-2xl"
      style={{
        backgroundColor:
          assignment.difficultyScore >= 3
            ? "red"
            : assignment.difficultyScore >= 2
            ? "#F79009"
            : "#66C61C",
        outline: current ? "3px solid #2F80ED" : "none",
        outlineOffset: current ? "1px" : "0",
      }}
    ></div>
  );
};

export default Progress;
