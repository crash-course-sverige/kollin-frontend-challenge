import Latex from "react-latex-next";

export const AnswerOption = ({ option, userAnswerId }) => {
  let bgColor = "bg-grey-300";

  if (userAnswerId === option.id) {
    if (option.correct) {
      bgColor = "bg-[#66C61C]";
    } else {
      bgColor = "bg-[#F79009]";
    }
  }

  return (
    <li className={`flex items-center border rounded-md p-2 ${bgColor}`}>
      <label className="flex items-center pl-3 w-full cursor-pointer">
        <input
          required
          className="h-5 w-5 mr-4 cursor-pointer"
          type="radio"
          name="answer"
          value={option.id}
          defaultChecked={userAnswerId === option.id}
          disabled={userAnswerId}
        />
        <Latex>{option.text}</Latex>
      </label>
    </li>
  );
};
