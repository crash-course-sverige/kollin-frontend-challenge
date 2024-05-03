import Latex from "react-latex-next";

const Options = ({ answerOptions, onCheck }) => {
  return (
    <div>
      <ul className="flex flex-col gap-3">
        {answerOptions.map((option) => (
          <li
            key={option.id}
            className="flex items-center border rounded-md p-2"
          >
            <label className="flex items-center w-full cursor-pointer">
              <input
                className="h-5 w-5 mr-2 cursor-pointer"
                type="radio"
                name="Answer"
              />
              <Latex>{option.text}</Latex>
            </label>
          </li>
        ))}
        <button
          onClick={onCheck}
          className="bg-[#586FB5] text-white p-2 rounded-md hover:bg-blue-600 mt-8"
        >
          Check
        </button>
      </ul>
    </div>
  );
};

export default Options;
