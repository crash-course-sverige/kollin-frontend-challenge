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
  }, [currentExercise.selectedAnswer]);

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
    <section>
      <p className="text-black">{currentExercise.questionText}</p>

      <fieldset>
        {currentExercise.answerOptions.map((option) => (
          <div
            className={`${
              currentExercise.selectedAnswer &&
              option.text === correctAnswer.text &&
              selectedOption
                ? "bg-green-300"
                : ""
            } ${
              currentExercise.selectedAnswer && option.text === selectedOption
                ? "bg-red-300"
                : ""
            }`}
            key={option.text}
          >
            <input
              type="radio"
              id={option.text}
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
        disabled={currentExercise.selectedAnswer}
        onClick={handleCheck}
        className={`${
          currentExercise.selectedAnswer ? "bg-gray-300" : "bg-blue-300"
        }`}
      >
        Check
      </button>
    </section>
  );
}
