"use client";
import excersises from "../../../exercises.json";

import { useState } from "react";

export function usePracticeLogic() {
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

  const handleClickTryAgain = () => {
    setAnswersResult(initialResults);
    setCurrentQuestion(0);
    setLifes(3);
  };

  return {
    answersResult,
    setAnswersResult,
    currentQuestion,
    setCurrentQuestion,
    lifes,
    setLifes,
    changeQuestion,
    takeLife,
    correctAnswers,
    handleClickTryAgain,
  };
}
