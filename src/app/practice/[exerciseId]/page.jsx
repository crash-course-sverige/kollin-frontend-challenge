"use client"
import { useState } from "react"
import ExerciseList from "../exerciseList"
import { useExerciseContext } from "../globalStates"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLightbulb } from "@fortawesome/free-solid-svg-icons"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"

export default function Exercise({ params }) {
    const { exerciseData, answer, setAnswer, lives, setLives, setCurrentQuestion } = useExerciseContext()
    const record = exerciseData.get(params.exerciseId)
    const questionId = params.exerciseId
    setCurrentQuestion(questionId)
    const [selectedOption, setSelectedOption] = useState(null)
    const [hintStatus, setHintStatus] = useState(0)
    
    function verifyAnswer() {
        const checking = record.answerOptions[selectedOption].correct
        setAnswer((prevMap) => {
            const newMap = new Map(prevMap)
            newMap.set(questionId, selectedOption)
            return newMap
        })
        !checking ? setLives((prevLives) => prevLives - 1) : ""
        if (lives == 1) {
            console.log(hintStatus)
            setHintStatus(2)
            console.log(hintStatus)
        }
    }
    
    return (
        <>
            <ExerciseList />
            <div className="tab-content" >
                <p className="question-text">{record.questionText}</p>
                <div className="question-metadata">
                    <p className="difficulty">
                        <span>Difficulty: </span>
                        {record.difficultyScore}
                    </p>
                    <p className="hints" onClick={() => setHintStatus(1)}>

                        <FontAwesomeIcon className="idea" icon={faLightbulb}>
                        </FontAwesomeIcon>
                        <div className={hintStatus == 1 ? "hint-modal hint-active" : "hint-modal"}>
                            <div className="hint-content">
                                <FontAwesomeIcon icon={faCircleXmark} className="close-modal" onClick={(e) => { e.stopPropagation(); setHintStatus(0); }}></FontAwesomeIcon>
                                <p>{record.hints == null ? "No Hints for this Question" : record.hints}</p>
                            </div>
                        </div>
                    </p>
                </div>
                {answer.has(questionId) ?
                    record.answerOptions[answer.get(questionId)].correct ? <p className="feedback-true">Correct</p> : <p className="feedback-false">Incorrect</p>
                    : ""}
                {record.answerOptions.map((option, id) => (
                    <div
                        className={`options  ${answer.get(questionId) == id || selectedOption == id ? 'options-selected' : ''}`}
                        key={id}
                        onClick={() => setSelectedOption(id)}
                    >
                        <input type="radio" value={id} name={record.id} checked={answer.get(questionId) == id || selectedOption == id} />
                        <label htmlFor={id}>{option.text}</label>
                    </div>
                ))}
                <button
                    className="verify-answer"
                    onClick={verifyAnswer}
                    disabled={answer.has(questionId) || lives == 0}
                >
                    Check
                </button>
                {answer.has(questionId) ?
                    <p className="feedback-true">{record.solutionText}</p>
                    : ""}
            </div>
            <div className={hintStatus == 2 ? "end-test test-active" : "end-test"}>
                <div className="performance">
                    <FontAwesomeIcon icon={faCircleXmark} className="close-modal" onClick={(e) => { e.stopPropagation(); setHintStatus(0); }}></FontAwesomeIcon>
                    <ul>
                        {[...answer].map(([key, val], id) => (
                            <li id={key}>
                                <span>Question: {id + 1}</span>
                                <span>{exerciseData.get(key).answerOptions[val].correct ? "Correct" : "Incorrect"}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}