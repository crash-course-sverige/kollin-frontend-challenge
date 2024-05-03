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

  console.log(exercises);

  const actualCurrentExercise = exercises.find(
    (exercise) => exercise.id === currentExercise.id
  );

  const allExercisesAnswered = exercises.every(
    (exercise) => exercise.selectedAnswer !== undefined
  );

  const showGameOver = hearts === 0 || allExercisesAnswered;

  return (
    <section className="flex flex-col gap-8 mx-auto w-4/5 mt-32 bg-white max-w-[1052px] items-center p-8">
      <header className="flex w-full">
        <Navigation
          exercises={exercises}
          currentExercise={currentExercise}
          handleExerciseChange={handleSetCurrentExercise}
        />
        <Hearts hearts={hearts} />
      </header>
      <main>
        <CurrentExercise
          currentExercise={actualCurrentExercise}
          handleSetAnswer={(answer) => handleSetAnswer(answer)}
          handleSetHearts={handleSetHearts}
        />
      </main>
      {showGameOver && (
        <GameOver hearts={hearts} exercises={exercises} restart={restart} />
      )}
    </section>
  );
}
