'use client';
import './ExercisePage.css';
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const ExercisesList = ({ exercises }) => {
	const [heartsNumber, setHeartsNumber] = useState(3);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [status, setStatus] = useState(
		new Array(exercises.length).fill({
			id: crypto.randomUUID(),
			isActive: false,
			isAnswered: false,
			isCorrect: false,
		}),
	);
	const [inputValue, setInputValue] = useState('');
	const [isFinished, setIsFinished] = useState(false);

	useEffect(() => {
		setStatus((prev) => {
			return prev.map((item, i) => {
				return i === 0 ? { ...item, isActive: true } : item;
			});
		});
	}, []);

	function handleNavigation(index) {
		setCurrentIndex((prev) => (prev = index));
		setStatus((prev) => {
			return prev.map((item, i) => {
				return i === index ? { ...item, isActive: true } : { ...item, isActive: false };
			});
		});
	}

	function handleAnswerSelection(answer) {
		setInputValue(answer);
	}

	function handleSubmit(event) {
		event.preventDefault();
		const correctAnswer = exercises[currentIndex].answerOptions.find((answer) => answer.correct);

		if (correctAnswer.text === inputValue) {
			confetti();
			setStatus((prev) => {
				return prev.map((item, i) => {
					if (i === currentIndex) {
						return {
							...item,
							isAnswered: true,
							isCorrect: true,
							isActive: false,
						};
					} else if (i === currentIndex + 1) {
						return {
							...item,
							isActive: true,
						};
					}
					return item;
				});
			});
			setCurrentIndex((prev) => prev + 1);
			setInputValue('');
		} else {
			heartsNumber > 1 ? setHeartsNumber((prev) => prev - 1) : setIsFinished(true);
			alert('Wrong answer');
			setStatus((prev) => {
				return prev.map((item, i) => {
					return i === currentIndex ? { ...item, isAnswered: true, isCorrect: false } : item;
				});
			});
			setInputValue('');
		}
	}

	const answersCounter = status.filter((status) => status.isCorrect).length;

	if (isFinished)
		return (
			<div className='container'>
				<div className='wrapper'>
					<h1>Oops, you are out of hearts!</h1>
					<span>
						You answered {answersCounter} out of {exercises.length} questions.
					</span>
				</div>
			</div>
		);

	return (
		<div className='container'>
			<div className='wrapper'>
				<div className='wrapper-progressBar'>
					{exercises.map((_, index) => (
						<div
							key={index}
							className={`progressBar ${
								status[index].isAnswered && !status[index].isCorrect && status[index].isActive
									? 'incorrect active'
									: status[index].isActive
									? 'active'
									: status[index].isAnswered && status[index].isCorrect
									? 'correct'
									: status[index].isAnswered && !status[index].isCorrect
									? 'incorrect'
									: ''
							}`}
							onClick={() => handleNavigation(index)}></div>
					))}
					<span>❤️</span> <span style={{ color: '#e03957' }}>{heartsNumber}</span>
				</div>
				<p>{exercises[currentIndex].questionText}</p>
				<form className='form'>
					{exercises[currentIndex].answerOptions.map((answer, index) => (
						<label
							className={`${inputValue === answer.text ? 'selected' : 'form-label'}`}
							htmlFor={`answer-${index}`}
							key={index}>
							<input
								type='radio'
								name='answer'
								id={`answer-${index}`}
								value={answer.text}
								checked={inputValue === answer.text}
								onChange={() => handleAnswerSelection(answer.text)}
							/>
							{answer.text}
						</label>
					))}
					<button
						className='btn'
						onClick={handleSubmit}>
						Check
					</button>
				</form>
			</div>
		</div>
	);
};

export default ExercisesList;
