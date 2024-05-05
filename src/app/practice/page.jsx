"use client";
import { useEffect, useState } from "react";
import exercisesJson from "../../../exercises.json";
import getAssignments from "../../lib/utils/getAssignment";
import ExercisesList from "./_components/ExercisesList";
import ExerciseDetails from "./_components/ExerciseDetails";
import getSummary from "../../lib/utils/getSummary";
import getInfoMessage from "../../lib/utils/getInfoMessage";
import SummaryModal from "./_components/SummaryModal";

const Practice = () => {
  const [exercises, setExercises] = useState([]);
  const [hearts, setHearts] = useState(3);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedExercise, setSelectedExercise] = useState({});
  const [infoMessage, setInfoMessage] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [congratulation, setCongratulation] = useState(false);
  const [summary, setSummary] = useState({});

  useEffect(() => {
    const fetchExercises = () => {
      exercisesJson?.forEach(async (exerciseId) => {
        const { getAssignment } = await getAssignments(exerciseId);
        if (getAssignment !== null) {
          getAssignment.answeredCorrectly = null;
          setExercises((prev) => [...prev, getAssignment]);
        }
        if (!selectedExercise.id) setSelectedExercise(() => getAssignment);
      });
    };

    fetchExercises();
  }, []);

  useEffect(() => {
    const totalWrongAnswers = exercises.filter(
      (exercise) => exercise.answeredCorrectly === false
    );
    const totalAnswers = exercises.filter(
      (exercise) => exercise.answeredCorrectly !== null
    );

    if (hearts <= 0 && totalWrongAnswers.length >= 3) {
      const sum = getSummary(exercises);
      setSummary(sum);
      setGameOver(true);
    }

    if (totalWrongAnswers.length < 3 && totalAnswers.length === 5) {
      const sum = getSummary(exercises);
      setSummary(sum);
      setCongratulation(true);
    }
  }, [exercises]);

  const handleExerciseSelected = (exercise) => {
    setSelectedExercise(() => exercise);
    setSelectedAnswer("");
  };

  const handleAnswerChange = (option) => {
    setSelectedAnswer(option);
  };

  const handleReset = () => {
    setGameOver(false);
    window.location.reload();
  };

  const handleCheckAnswer = (e) => {
    e.preventDefault();

    if (selectedExercise.answeredCorrectly !== null) {
      getInfoMessage(
        "You have already checked this question. Please continue to the next one!",
        setInfoMessage,
        setShowFeedback
      );
      return;
    }
    if (!selectedAnswer?.text) {
      getInfoMessage(
        "Please select an answer before checking!",
        setInfoMessage,
        setShowFeedback
      );
      return;
    }
    if (selectedAnswer?.text && !selectedAnswer?.correct) {
      getInfoMessage(
        "Your Answer was incorrect!",
        setInfoMessage,
        setShowFeedback
      );

      setHearts((prev) => prev - 1);
      setExercises((prev) =>
        prev.map((exercise) => {
          if (exercise.id === selectedExercise.id) {
            exercise.answeredCorrectly = false;
            return exercise;
          }
          return exercise;
        })
      );
      return;
    }
    if (selectedAnswer?.correct) {
      getInfoMessage(
        "Well done, that was a correct Answer!",
        setInfoMessage,
        setShowFeedback
      );

      setExercises((prev) =>
        prev.map((exercise) => {
          if (exercise.id === selectedExercise.id) {
            exercise.answeredCorrectly = true;
            return exercise;
          }
          return exercise;
        })
      );
      return;
    }
  };

  return (
    <section className="relative flex flex-col items-center h-screen bg-primary max-w-screen-2xl">
      {gameOver && (
        <SummaryModal handleReset={handleReset} summary={summary} textContent={'GAME OVER'} textColour={'text-rose-600'}/>
      )}

      {congratulation && (
         <SummaryModal handleReset={handleReset} summary={summary} textContent={'Congratulation !!!'} textColour={'text-tertiary'}/>
      )}

      <h1 className="my-8 text-5xl font-semibold text-nonary text-center">
        Trigonometriska funktioner & identiteter
      </h1>

      <section className="flex flex-col items-center px-2 bg-white w-[90%] h-screen rounded-t-3xl">
        <ExercisesList
          exercises={exercises}
          handleExerciseSelected={handleExerciseSelected}
          selectedExercise={selectedExercise}
          hearts={hearts}
        />
        {selectedExercise?.id && (
          <ExerciseDetails
            selectedExercise={selectedExercise}
            handleCheckAnswer={handleCheckAnswer}
            selectedAnswer={selectedAnswer}
            handleAnswerChange={handleAnswerChange}
            showFeedback={showFeedback}
            infoMessage={infoMessage}
          />
        )}
      </section>
    </section>
  );
};

export default Practice;
