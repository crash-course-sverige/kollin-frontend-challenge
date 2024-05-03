"use client";

import Navigation from "./Navigation";
import Hearts from "./Hearts";
import CurrentExercise from "./CurrentExercise";

import { useState } from "react";

export default function Exercise({ exerciseData }) {
  const [exercises, setExercises] = useState(exerciseData);
  const [currentExercise, setCurrentExercise] = useState(exercises[0]);
  const [hearts, setHearts] = useState(3);

  function handleExerciseChange(indexOfClickedExercise) {
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

  console.log(exercises);

  const actualCurrentExercise = exercises.find(
    (exercise) => exercise.id === currentExercise.id
  );

  return (
    <section className="flex flex-col gap-8 mx-32 mt-32 bg-white items-center p-8">
      <header className="flex">
        <Navigation
          exercises={exercises}
          currentExercise={currentExercise}
          handleExerciseChange={handleExerciseChange}
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
      {hearts === 0 && (
        <div className="absolute top-0 left-0 z-10 bg-gray-700 bg-opacity-50 w-screen h-screen">
          <h1 className="text-4xl text-red-400 ">Game Over</h1>
        </div>
      )}
    </section>
  );
}
