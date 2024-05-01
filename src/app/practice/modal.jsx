/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

const Modal = ({ exercise, exercises, currentIndex, openModal, onNextExercise }) => {
  const [answerStatus, setAnswerStatus] = useState({});
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [feedbackMessages, setFeedbackMessages] = useState({});
  const [heart, setHeart] = useState(3);

  const nextQuestion = () => {
	onNextExercise();
  }
  useEffect(() => {
    if (exercise) {
      const shuffled = [...exercise.answerOptions].sort(() => 0.5 - Math.random());
      setShuffledAnswers(shuffled);
    }
  }, [exercise]);

  const handleChange = (id, value) => {
    setAnswerStatus(prev => ({
      ...prev,
      [id]: { ...prev[id], answer: value, checked: false }
    }));
  };

  const checkAnswer = () => {
    let newStatus = { ...answerStatus };
    let newMessages = {};
    
    exercises.forEach(ex => {
        if (newStatus[ex.id]) {
            const correctOption = ex.answerOptions.find(option => option.correct);
            const isCorrect = newStatus[ex.id].answer === correctOption.text;
            newStatus[ex.id] = { ...newStatus[ex.id], correct: isCorrect, checked: true };
            newMessages[ex.id] = isCorrect ? "Correct answer!" : "Wrong answer!";
        }
    });

    setAnswerStatus(newStatus);
    setFeedbackMessages(newMessages);
};

  return (
    <div className="page">
      <div className="btn-holder">
        <Button onClick={openModal}>Stäng övning</Button>
        <Button onClick={nextQuestion}>Nästa övning</Button>
      </div>
      <h1>Trigonometriska funktioner & identiteter</h1>
      <section className="container">
        <div className="progress-bar">
          {exercises.map((ex, index) => {
            const status = answerStatus[ex.id];
            const bgColor = status?.checked
              ? (status.correct ? "#66C61C" : "grey")
              : "#e1c699";
            return (
              <div
                className="progress-div"
                style={{ backgroundColor: bgColor }}
                key={ex.id}
                data-index={index}
              ></div>
            );
          })}
        </div>
        <span>{exercise.questionText}</span>
        {shuffledAnswers.map((opt, index) => (
          <div key={index}>
            <input
              onChange={(e) => handleChange(exercise.id, e.target.value)}
              type="radio"
              name={`exercise-options-${exercise.id}`}
              value={opt.text}
              checked={answerStatus[exercise.id]?.answer === opt.text}
            />
            <label>{opt.text}</label>
          </div>
        ))}
        <Button onClick={checkAnswer}>Check</Button>
        {feedbackMessages[exercise.id] && (
          <div className="feedback-message">
            {feedbackMessages[exercise.id]}
          </div>
        )}
      </section>
    </div>
  );
};

export default Modal;
