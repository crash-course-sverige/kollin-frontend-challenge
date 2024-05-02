/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

const Modal = ({ exercise, exercises, currentIndex, openModal, onNextExercise, onPrevExercise, hints }) => {
  const [answerStatus, setAnswerStatus] = useState({});
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [message, setMessages] = useState({});
  const [correctMessage, setCorrectMessage] = useState("");
  const [solution, setSolution] = useState("");
  const [heart, setHeart] = useState(3);
  const [showRightAnswer, setShowRightAnswer] = useState(false);
  const [hintIndex, setHintIndex] = useState(0); 
  const [hint, setShowHint] = useState("");
  const [hintVisible, setHintVisible] = useState(false);


  const nextQuestion = () => {
	onNextExercise();
  }

  const prevQuestion = () => {
	onPrevExercise();
  }

  useEffect(() => {
    if (exercise) {
      const shuffled = [...exercise.answerOptions].sort(() => 0.5 - Math.random());
      setShuffledAnswers(shuffled);
	  setShowRightAnswer(false)
	  setCorrectMessage("");
	  setSolution("");
	  setShowHint("");
	  setHintVisible(false); 
	  setHintIndex(0); 
    }
  }, [exercise]);

  const handleChange = (id, value) => {
    setAnswerStatus(prev => ({
      ...prev,
      [id]: { ...prev[id], answer: value, checked: false }
    }));
  };

 
  const checkAnswer = () => {
    const newStatus = { ...answerStatus };
    const newMessages = {};
    let isIncorrect = false; 

    exercises.forEach(ex => {
        if (newStatus[ex.id]) {
            const correctOption = ex.answerOptions.find(opt => opt.correct);
            const isCorrect = newStatus[ex.id].answer === correctOption.text;

            newStatus[ex.id] = { ...newStatus[ex.id], correct: isCorrect, checked: true };
            newMessages[ex.id] = isCorrect ? `Bravo! Det rätta svaret var: "${correctOption.text}"` : "Tyvärr, det var fel svar! Se lösningen nedan";
			if (!isCorrect && exercises[currentIndex].id === ex.id) {
				isIncorrect = true;
				setShowRightAnswer(true);
				setCorrectMessage(`Rätt svar var: ${correctOption.text}`)
				setSolution(ex.solutionText)
			}
        }
    });

    if (isIncorrect) {
        setHeart(prevHeart => prevHeart - 1); 
    }

    setAnswerStatus(newStatus);
    setMessages(newMessages);
};

  
const showHint = () => {
    if (!hintVisible && hints && hints.length > 0) {
      setShowHint(hints[0]); 
      setHintVisible(true); 
    }
  };

  const nextHint = () => {
	setHintIndex(prevIndex => {
	  let nextIndex = prevIndex + 1;
	  if (nextIndex >= hints.length) {  
		nextIndex = 0;                 
	  }
	  setShowHint(hints[nextIndex]);   
	  return nextIndex;           
	});
  };



  return (
    <div className="page">
      <div className="btn-holder">
        <Button onClick={openModal}>Stäng övning</Button>
		<div>
		<Button onClick={prevQuestion} style={{marginRight: "10px"}}>Föregående övning</Button>
        <Button onClick={nextQuestion}>Nästa övning</Button>
		</div>

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
		
    <svg height="20px" width="20px" version="1.1" id="Layer_1" viewBox="0 0 512 512">
        <path style={{ fill: "#FF318F" }} d="M467.204,67.921C412.786,20.394,329.86,25.984,282.31,80.365l-26.311,29.66l-26.311-29.66  C182.138,25.984,99.212,20.396,44.795,67.921c-54.437,47.543-60.045,130.51-12.503,184.946l185.641,206.535  c9.692,10.783,23.568,16.968,38.067,16.968c14.499,0,28.375-6.185,38.067-16.968L479.546,253.05l0.161-0.182  C527.251,198.431,521.641,115.464,467.204,67.921z"/>
        <path style={{ fill: "#BF256B" }} d="M467.204,67.921C412.786,20.394,329.86,25.984,282.31,80.365l-26.311,29.66v366.346  c14.5,0,28.375-6.185,38.067-16.968L479.545,253.05l0.161-0.182C527.251,198.431,521.641,115.464,467.204,67.921z"/>
    </svg>
	<span>{heart}
</span>
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
		 {!showRightAnswer ? (
          <Button onClick={checkAnswer}>Check</Button>
        ) : (
          <div>{correctMessage}</div>
        )}
        
		<Button onClick={showHint}>Få en hint</Button>
		{hint && (
        <>
          <div className="hint">{hint}</div>
          <Button onClick={nextHint}>Nästa hint</Button>
        </>
      )}
        {message[exercise.id] && (
          <div className="message">
            {message[exercise.id]}
          </div>
        )}
      </section>
	{solution != "" &&
	<div className='solution'>
		<h4>Lösningen var: </h4>
		{solution}
		</div>
	}
	
	
    </div>
  );
};

export default Modal;
