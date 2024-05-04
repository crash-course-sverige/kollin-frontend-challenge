"use client";

import Navigation from "./Navigation";
import Hearts from "./Hearts";
import CurrentExercise from "./CurrentExercise";
import GameOver from "./GameOver";

import { useState } from "react";

export default function Exercise({ exerciseData }) {
  const [exercises, setExercises] = useState(exerciseData);
  const [currentExercise, setCurrentExercise] = useState(exercises[0]);
  const [hearts, setHearts] = useState(3);

  function handleSetCurrentExercise(indexOfClickedExercise) {
    if (currentExercise.id !== exercises[indexOfClickedExercise].id) {
      setCurrentExercise((prevExercise) => {
        return (prevExercise = exercises[indexOfClickedExercise]);
      });
    }
  }

  function handleSetAnswer(answer) {
    setExercises((prevExercises) => {
      const newExercises = [...prevExercises];
      const modifiedExercise = { ...currentExercise, selectedAnswer: answer };
      const exerciseIndex = newExercises.findIndex(
        (exercise) => exercise.id === currentExercise.id
      );
      if (exerciseIndex !== -1) {
        newExercises[exerciseIndex] = modifiedExercise;
      }

      return newExercises;
    });
  }

  function handleSetHearts() {
    setHearts((prevHearts) => {
      return prevHearts - 1;
    });
  }

  function restart() {
    setExercises((prevExercises) => {
      return (prevExercises = exerciseData);
    });
    setCurrentExercise((prevExercise) => {
      return (prevExercise = exerciseData[0]);
    });
    setHearts((prevHearts) => {
      return (prevHearts = 3);
    });
  }

  const actualCurrentExercise = exercises.find(
    (exercise) => exercise.id === currentExercise.id
  );

  const allExercisesAnswered = exercises.every(
    (exercise) => exercise.selectedAnswer !== undefined
  );

  const showGameOver = hearts === 0 || allExercisesAnswered;

  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 mx-auto h-4/5 flex flex-col gap-8  w-4/5  bg-white max-w-[1352px] items-center p-8 rounded-t-[64px]">
        <header className="flex items-center w-4/5">
          <Navigation
            exercises={exercises}
            currentExercise={currentExercise}
            handleExerciseChange={handleSetCurrentExercise}
          />
          <Hearts hearts={hearts} />
        </header>
        <main className="w-4/5">
          <CurrentExercise
            currentExercise={actualCurrentExercise}
            handleSetAnswer={(answer) => handleSetAnswer(answer)}
            handleSetHearts={handleSetHearts}
          />
        </main>
      </div>
      {showGameOver && (
        <GameOver hearts={hearts} exercises={exercises} restart={restart} />
      )}
    </>
  );
}
