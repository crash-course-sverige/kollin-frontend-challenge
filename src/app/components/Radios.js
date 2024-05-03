import React from "react";
import Latex from "react-latex";
import { useState } from "react";

const Radios = ({ assignment, selected, setSelected, answers, setAnswers }) => {
  const [outcome, setOutcome] = useState(null);
  const [hintIndex, setHintIndex] = useState(0);

  const handleClick = () => {
    if (selected) {
      let answer = assignment.answerOptions.find(
        (option) => option.text === selected
      );
      if (answer.correct) {
        setAnswers([
          ...answers,
          { id: assignment.id, answer: selected, correct: true },
        ]);
        setOutcome(true);
      } else {
        setAnswers([
          ...answers,
          { id: assignment.id, answer: selected, correct: true },
        ]);
        setOutcome(false);
        setHintIndex((hintIndex + 1) % 5);
      }
    } else {
      // Display error message when select is null
      console.error("Please select an option");
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <ul className="gap-3 flex flex-col">
        {assignment.answerOptions.map((qs, i) => (
          <Option
            option={qs}
            key={i}
            selected={selected}
            setSelected={setSelected}
            outcome={outcome}
            setOutcome={setOutcome}
          ></Option>
        ))}
      </ul>
      <button
        className="bg-[#586FB5] text-white shadow-lg rounded-md py-2 px-4 hover:bg-[#4A5F9C] active:bg-[#2c385d]"
        onClick={handleClick}
      >
        Check
      </button>
      {!selected && <p className="text-red-500">Please select an option</p>}
      {outcome === true && (
        <p className="text-green-700 text-xs h-48 overflow-scroll">
          <Latex>{assignment.solutionText}</Latex>
        </p>
      )}
      {outcome === false && (
        <p className="text-red-700 text-xs h-40 overflow-scroll">
          <Latex>{assignment.hints[hintIndex]}</Latex>
        </p>
      )}
    </div>
  );
};

const Option = ({ option, selected, setSelected, outcome, setOutcome }) => {
  const handleOptionChange = () => {
    setOutcome(null);
    setSelected(option.text);
  };

  const getBorderColor = () => {
    if (selected === option.text && outcome === null) {
      return "#A8B9EE";
    } else if (selected === option.text && outcome === true) {
      return "green";
    } else if (selected === option.text && outcome === false) {
      return "red";
    } else {
      return "";
    }
  };

  return (
    <li
      className="flex flex-row gap-4 py-2 rounded-md w-full border-2 pl-[35%] hover:bg-gray-100 !cursor-pointer"
      style={{
        backgroundColor: selected === option.text ? "#E2E8F9" : "",
        borderColor: getBorderColor(),
      }}
      onClick={handleOptionChange}
    >
      <input
        className="color-[#586FB5] text-[#586FB5] cursor-pointer"
        type="radio"
        id={option.text}
        name="option"
        style={{ color: "#586FB5" }}
        checked={selected === option.text}
        onChange={handleOptionChange}
      />
      <label htmlFor={option.id} className="cursor-pointer">
        <Latex>{option.text}</Latex>
      </label>
    </li>
  );
};

export default Radios;
