import React from "react";

const Radios = ({ assignment, selected, setSelected }) => {
  return (
    <ul className="gap-3 flex flex-col">
      {assignment.answerOptions.map((qs, i) => (
        <Option
          option={qs}
          key={i}
          selected={selected}
          setSelected={setSelected}
        ></Option>
      ))}
    </ul>
  );
};

const Option = ({ option, selected, setSelected }) => {
  const handleOptionChange = () => {
    setSelected(option.text);
  };

  return (
    <li
      className="flex flex-row gap-4 py-2 rounded-md w-full border-2 pl-[40%] hover:bg-gray-100 !cursor-pointer"
      style={{
        backgroundColor: selected === option.text ? "#E2E8F9" : "",
        borderColor: selected === option.text ? "#A8B9EE" : "",
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
        {option.text}
      </label>
    </li>
  );
};

export default Radios;
