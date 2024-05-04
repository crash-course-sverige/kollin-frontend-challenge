// pages/QuizPage.js
import React, { useState } from 'react';
import QuestionTitle from '../components/QuestionTitle';
import Tabs from '../components/Tabs';
import HeartScore from '../components/HeartScore';
import QuestionCard from '../components/QuestionCard';
import CheckButton from '../components/CheckButton';

const QuizPage = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(3);
    
    const questions = [
        { question: "What is the capital of France?", options: [{ text: "Paris", correct: true }, { text: "Lyon" }, { text: "Marseille" }, { text: "Nice" }] },
        // Add more questions corresponding to the tabs
    ];

    const handleTabChange = (index) => {
        setCurrentQuestionIndex(index);
        setSelectedOption(null); // Reset selection on tab change
    };

    const handleAnswerSelect = (option) => {
        setSelectedOption(option);
    };

    const checkAnswer = () => {
        if (selectedOption && selectedOption.correct) {
            alert("Correct Answer!");
            // Optionally move to next question or handle end of quiz
        } else {
            if (score > 1) {
                setScore(score - 1);
            } else {
                alert("Game Over!");
                setScore(3); // Reset score or handle differently
                setCurrentQuestionIndex(0); // Optionally reset to the first question
            }
            alert("Wrong Answer. Try again!");
        }
    };

    return (
        <div style={{ padding: '20px', background: '#586FB5' }}>
            <QuestionTitle text="Quiz Time" />
            <Tabs activeIndex={currentQuestionIndex} onTabChange={handleTabChange} />
            <HeartScore score={score} />
            <QuestionCard
                question={questions[currentQuestionIndex].question}
                options={questions[currentQuestionIndex].options}
                onAnswerSelect={handleAnswerSelect}
            />
            <CheckButton onClick={checkAnswer} />
        </div>
    );
};

export default QuizPage;
