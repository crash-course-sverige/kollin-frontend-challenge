"use client";
import excersises from "../../../exercises.json";
import { Assignment } from "./Assignment";
import { Header } from "./Header";
import { Button } from "@nextui-org/button";
import { usePracticeLogic } from "../hooks/usePracticeLogic";

export default function PracticePage() {
  const {
    answersResult,
    setAnswersResult,
    currentQuestion,
    lifes,
    changeQuestion,
    takeLife,
    correctAnswers,
    handleClickTryAgain,
  } = usePracticeLogic();

  if (lifes === 0) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center p-24 bg-[#202746]">
        <div className="mt-4">
          <p>Game over!</p>
          <p>
            Correct Answers: {correctAnswers} from {excersises.length} questions
          </p>
          <Button onClick={handleClickTryAgain}>Try again!</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-24 bg-[#202746]">
      <h1 className="mb-8 text-4xl">
        Trigonometriska funktioner & identiteter
      </h1>
      <div className="p-20 justify-between items-center relative min-w-[80%] flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border">
        <Header
          excersises={excersises}
          answersResult={answersResult}
          lifes={lifes}
          changeQuestion={changeQuestion}
          currentQuestionId={excersises[currentQuestion]}
        />

        {currentQuestion < excersises.length && (
          <Assignment
            id={excersises[currentQuestion]}
            answersResult={answersResult}
            setResult={setAnswersResult}
            takeLife={takeLife}
          ></Assignment>
        )}
      </div>
    </div>
  );
}
