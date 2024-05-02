"use client";
import excersises from "../../../exercises.json";
import { Assignment } from "./Assignment";
import { Header } from "./Header";
import { useState } from "react";
import { Button } from "@nextui-org/button";

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

  const handleClickTryAgaine = () => {
    setAnswersResult(initialResults);
    setCurrentQuestion(0);
    setLifes(3);
  };

  if (lifes === 0) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center p-24 bg-[#202746]">
        <div className="mt-4">
          <p>Game over!</p>
          <p>
            Correct Answers: {correctAnswers} from {excersises.length} questions
          </p>
          <Button onClick={handleClickTryAgaine}>Try againe!</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-24 bg-[#202746]">
    <h1 className="mb-8 text-4xl">Trigonometriska funktioner & identiteter</h1>
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
