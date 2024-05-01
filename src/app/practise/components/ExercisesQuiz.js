"use client";
import React, { useState, useEffect } from "react";

const ExercisesQuiz = ({ exercises }) => {
    const [selectedOption, setSelectedOption] = useState("");
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [lives, setLives] = useState(3);
    const [status, setStatus] = useState(new Array(exercises.length).fill("unanswered"));
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect(() => {
        const updatedStatus = [...status];
        if (updatedStatus[currentExerciseIndex] === "unanswered") {
            updatedStatus[currentExerciseIndex] = "active";
            setStatus(updatedStatus);
        }
    }, [currentExerciseIndex]);

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const correctAnswer = exercises[currentExerciseIndex].answerOptions.find((option) => option.correct)?.text;
        const updatedStatus = [...status];

        if (selectedOption === correctAnswer) {
            alert("Correct answer!");
            updatedStatus[currentExerciseIndex] = "correct";
            setCurrentExerciseIndex((current) => current + 1);
        } else {
            alert("Wrong answer!");
            if (lives > 1) {
                setLives(lives - 1);
            } else {
                setIsGameOver(true);
            }
        }
        setStatus(updatedStatus);
    };

    const selectExercise = (index) => {
        setCurrentExerciseIndex(index);
        setSelectedOption("");
    };

    const handleRetry = () => {
        setLives(3);
        setCurrentExerciseIndex(0);
        setSelectedOption("");
        setStatus(new Array(exercises.length).fill("unanswered"));
        setIsGameOver(false);
    };

    const correctCount = status.filter((status) => status === "correct").length;

    if (isGameOver) {
        return (
            <div className="max-w-md p-4 mx-auto text-center bg-white rounded-lg shadow">
                <h2 className="text-2xl font-semibold text-red-500">Game Over!</h2>
                <p className="mb-4">
                    You've run out of lives. You answered {correctCount} out of {exercises.length} questions correctly.
                </p>
                <button onClick={handleRetry} className="p-2 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl p-4 mx-auto space-y-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
                <div className="flex w-full h-4 gap-2 rounded-full cursor-pointer">
                    {exercises.map((_, index) => (
                        <div key={index} className={`h-full ${status[index] === "correct" ? "bg-[#66C61C]" : "bg-[#F79009]"} rounded-full`} style={{ width: `${100 / exercises.length}%` }} onClick={() => selectExercise(index)} />
                    ))}
                </div>
                <div className="inline-flex items-center flex-1 gap-1 ml-4 text-red-500">
                    <span>❤️</span>
                    <span className="font-medium">{lives}</span>
                </div>
            </div>
            <div className="space-y-2">
                <h1 className="font-semibold">Quiz {currentExerciseIndex + 1}</h1>
                <p>{exercises[currentExerciseIndex].questionText}</p>
            </div>
            <form onSubmit={handleSubmit}>
                {exercises[currentExerciseIndex].answerOptions.map((option, index) => (
                    <label key={index} className={`flex justify-center p-2 mb-4 border-2 rounded-md cursor-pointer ${selectedOption === option.text ? "bg-blue-100 border-[#A8B9EE] shadow-md" : "bg-white border-gray-300"}`}>
                        <input type="radio" name="answer" value={option.text} onChange={() => handleOptionChange(option.text)} checked={selectedOption === option.text} className="mr-2 accent-blue-500" style={{ accentColor: "blue" }} />
                        {option.text}
                    </label>
                ))}
                <button type="submit" className="w-full p-2  text-sm text-white bg-[#586FB5] rounded font-semibold">
                    Check
                </button>
            </form>
        </div>
    );
};

export default ExercisesQuiz;
