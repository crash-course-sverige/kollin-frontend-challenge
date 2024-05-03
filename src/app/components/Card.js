import React from "react";
import Latex from "react-latex";

const Card = ({ assignment }) => {
  return (
    <div className="card px-[232px] py-8 mx-64 rounded-2xl bg-white h-full">
      <div key={assignment.id} className="flex flex-col gap-8">
        <div>progress</div>
        <Latex>{assignment.questionText}</Latex>
        <ul className="gap-3 flex flex-col">
          {assignment.answerOptions.map((qs, i) => (
            <Option option={qs} key={i}></Option>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Option = ({ option }) => (
  <li className="flex flex-row gap-4 py-2 rounded-md w-full border-2 pl-[40%]">
    <input type="radio" id={option.id} name="option" />
    <label htmlFor={option.id}>{option.text}</label>
  </li>
);

export default Card;
