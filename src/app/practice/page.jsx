"use client";

import { callAPI } from "../getExercieses";
import { useState, useEffect } from "react";
import { CircularProgress } from "@nextui-org/react";
import exercisesData from "../../../exercises.json";
import MainCard from "../components/MainCard";

const Exersices = () => {
  const [exercises, setExercises] = useState([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [questionStatus, setQuestionStatus] = useState(
    new Array(exercises.length).fill(null),
  );
  const [livesleft, setLivesleft] = useState(3);

  const fetchExercises = async () => {
    const fetchedExercises = await Promise.all(
      exercisesData.map((exerciseId) => callAPI(exerciseId)),
    );
    const mappedExercises = fetchedExercises
      .map((exercice) => exercice.data.getAssignment)
      .filter(Boolean);
    setExercises(mappedExercises);
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  const handleExerciseChange = (index) => {
    setCurrentExerciseIndex(index);
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen p-24 bg-[#202746]">
      <h1 className="flex justify-center text-2xl text-white font-bold mb-6">
        Trigonometriska funktioner & identiteter
      </h1>
      {exercises.length > 0 ? (
        <div className="flex justify-center" key={exercises[currentExerciseIndex].id}>
          <MainCard
            questionStatus={questionStatus}
            setQuestionStatus={setQuestionStatus}
            livesleft={livesleft}
            setLivesleft={setLivesleft}
            difficulty={exercises[currentExerciseIndex].difficultyScore}
            question={exercises[currentExerciseIndex].questionText}
            answers={exercises[currentExerciseIndex].answerOptions}
            hint={exercises[currentExerciseIndex].hints}
            exercises={exercises}
            onExerciseChange={handleExerciseChange}
            exerciseIndex={currentExerciseIndex}
          />
        </div>
      ) : (
        <CircularProgress className="text-xl text-white font-bold" label="Loading..." />
      )}
    </div>
  );
};

export default Exersices;
