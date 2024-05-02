"use client";
import excersises from "../../../exercises.json";
import { Assignment } from "./Assignment";
import { Header } from "./Header";
import { useState } from "react";

export default function PracticePage() {
  const initialResults = excersises.reduce((acc, id) => {
    acc[id] = undefined;
    return acc;
  }, {});
  const [answersResult, setAnswersResult] = useState(initialResults);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [lifes, setLifes] = useState(3);

  const changeQuestion = (id) => {
    setCurrentQuestion(excersises.findIndex((item) => item === id));
  };

  const takeLife = () => setLifes(lifes - 1);

  const correctAnswers = Object.values(answersResult).filter(
    (value) => value === true,
  ).length;

  if (lifes === 0) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center p-24 bg-[#202746]">
        <div className="mt-4">
          <p>Game over!</p>
          <p>
            Correct Answers: {correctAnswers} from {excersises.length} questions
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-24 bg-[#202746]">
      <div className="p-20 justify-between items-center relative min-w-[80%] flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border">
        <Header
          excersises={excersises}
          answersResult={answersResult}
          lifes={lifes}
          changeQuestion={changeQuestion}
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
