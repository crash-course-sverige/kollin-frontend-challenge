import React from "react";
import Confetti from "react-dom-confetti";

const Progress = ({ assignments, index, answers, setIndex }) => {
  return (
    <div className="w-full flex gap-2 items-center">
      {assignments.map((assignment, i) => (
        <Single
          key={i}
          index={i}
          assignment={assignment}
          current={i === index}
          answers={answers}
          setIndex={setIndex}
        />
      ))}
    </div>
  );
};

const Single = ({ index, assignment, current, answers, setIndex }) => {
  let answer = answers.find((ans) => ans.id === assignment.id);
  return (
    <>
      <Confetti active={answer?.correct} />
      <div
        className="single-progress flex flex-grow h-4 rounded-2xl hover:cursor-pointer hover:shadow-md"
        style={{
          backgroundColor: answer
            ? answer.correct
              ? "green"
              : "orange"
            : "#D7D3D0",

          outline: current ? "3px solid #2F80ED" : "none",
          outlineOffset: "1px",
        }}
        onClick={() => setIndex(index)}
      ></div>
    </>
  );
};

export default Progress;
