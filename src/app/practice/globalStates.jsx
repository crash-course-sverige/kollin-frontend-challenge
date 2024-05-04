"use client"
import { createContext, useContext, useState } from 'react';

const ExerciseContext = createContext();

export const ExerciseProvider = ({ children }) => {
  const [exerciseData, setExerciseData] = useState(new Map());
  const [currentQuestion,setCurrentQuestion]=useState(null)
  const [answer, setAnswer] = useState(new Map());
  const [lives, setLives] = useState(3);

  return (
    <ExerciseContext.Provider
      value={{ exerciseData, setExerciseData, answer, setAnswer, lives, setLives,currentQuestion,setCurrentQuestion }}
    >
      {children}
    </ExerciseContext.Provider>
  );
};

export const useExerciseContext = () => useContext(ExerciseContext);
