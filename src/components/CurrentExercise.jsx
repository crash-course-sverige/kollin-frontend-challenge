import { useState, useEffect } from "react";

export default function CurrentExercise({
  currentExercise,
  handleSetAnswer,
  handleSetHearts,
}) {
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (currentExercise.selectedAnswer) {
      setSelectedOption(currentExercise.selectedAnswer);
    } else {
      setSelectedOption(null);
    }
  }, [currentExercise.selectedAnswer, currentExercise]);

  const correctAnswer = currentExercise.answerOptions.find(
    (option) => option.correct === true
  );

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleCheck = () => {
    handleSetAnswer(selectedOption);

    if (selectedOption !== correctAnswer.text) {
      handleSetHearts();
    }
  };

  return (
    <section className="flex flex-col gap-8">
      <p className="text-black">{currentExercise.questionText}</p>

      <fieldset className="flex flex-col items-center justify-end gap-2">
        {currentExercise.answerOptions.map((option) => (
          <div
            className={`
            border-2 border-[#E7E5E4]  rounded-lg p-4 w-full flex justify-center gap-2
            ${
              (
                currentExercise.selectedAnswer
                  ? currentExercise.selectedAnswer === option.text
                  : selectedOption === option.text
              )
                ? "bg-[#E2E8F9]  border-[#A8B9EE]"
                : ""
            }
            ${
              currentExercise.selectedAnswer &&
              option.text === correctAnswer.text &&
              selectedOption
                ? "bg-green-300"
                : ""
            } ${
              currentExercise.selectedAnswer &&
              option.text === selectedOption &&
              option.text !== correctAnswer.text
                ? "bg-red-300"
                : ""
            }
            `}
            key={option.text}
          >
            <input
              type="radio"
              id={option.text}
              className=""
              name="options"
              value={option.text}
              checked={
                currentExercise.selectedAnswer
                  ? currentExercise.selectedAnswer === option.text
                  : selectedOption === option.text
              }
              onChange={handleOptionChange}
              disabled={currentExercise.selectedAnswer}
            />
            <label htmlFor={option.text}>{option.text}</label>
          </div>
        ))}
      </fieldset>

      <button
        disabled={currentExercise.selectedAnswer || !selectedOption}
        onClick={handleCheck}
        className={`${
          currentExercise.selectedAnswer || !selectedOption
            ? "bg-gray-300"
            : "bg-blue-300"
        }`}
      >
        Check
      </button>
    </section>
  );
}
