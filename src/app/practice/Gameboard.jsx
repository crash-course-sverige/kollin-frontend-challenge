'use client';

import { useCallback, useEffect, useState } from 'react';
import { FaCheck, FaHeart, FaHeartBroken } from 'react-icons/fa';
import AnswerButton from './AnswerButton';
import Hints from './Hints';
import Modal from './Modal';
import Button from './Button';
import { IoCloseSharp } from 'react-icons/io5';
import Badge from './Badge';
import ResultModal from './ResultModal';

const Gameboard = ({ fetchedAssignments }) => {
  const [assignments, setAssignments] = useState();
  const [currentAssignmentIndex, setcurrentAssignmentIndex] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);

  const mapAssignments = useCallback(() => {
    const mappedAssignments = fetchedAssignments.map((assigntment) => ({
      ...assigntment,
      userAnswer: null,
      userAnswerChecked: false,
    }));

    setAssignments(mappedAssignments);
  }, [fetchedAssignments]);

  useEffect(() => {
    mapAssignments();
  }, [fetchedAssignments, mapAssignments]);

  if (!assignments) {
    return <></>;
  }

  const currentAssignment = assignments[currentAssignmentIndex];

  const generateProgressBar = () => {
    return assignments.map((assignment, index) => {
      let border = '';
      let color = 'bg-gray-300';

      if (index === currentAssignmentIndex) {
        border = 'outline outline-2 outline-offset-2 outline-blue-400';
      }

      if (assignment.answeredCorrectly === true) {
        color = 'bg-[#66C61C]';
      } else if (assignment.answeredCorrectly === false) {
        color = 'bg-[#F79009]';
      }
      return (
        <button
          onClick={() => {
            setcurrentAssignmentIndex(index);
          }}
          key={`${assignment.id}-section-button`}
          className={`h-full grow rounded-full ${color} ${border}`}
        ></button>
      );
    });
  };

  const checkForAnswers = () => {
    let allQuestionsAnswered = true;

    for (const assignment of assignments) {
      if (!assignment.userAnswerChecked) {
        allQuestionsAnswered = false;
        break;
      }
    }

    return allQuestionsAnswered;
  };

  const handleSelectAnswer = (index) => {
    setAssignments((old) => {
      const newAssignments = [...old];
      newAssignments[currentAssignmentIndex].userAnswer = index;
      return newAssignments;
    });
  };

  const handleCheckAnswer = () => {
    setAssignments((old) => {
      const newAssignments = [...old];
      const userAnswer = newAssignments[currentAssignmentIndex].userAnswer;
      newAssignments[currentAssignmentIndex].userAnswerChecked = true;

      const answeredCorrectly =
        newAssignments[currentAssignmentIndex].answerOptions[userAnswer]
          .correct;

      newAssignments[currentAssignmentIndex].answeredCorrectly =
        answeredCorrectly;

      if (!answeredCorrectly) {
        const newHearts = hearts - 1;
        setHearts(newHearts);
      }

      return newAssignments;
    });

    setShowAssignmentModal(true);
  };

  const nextButton = () => {
    const allQuestionsAnswered = checkForAnswers();

    let onClick;
    let text;

    if (allQuestionsAnswered || hearts === 0) {
      onClick = () => {
        setShowAssignmentModal(false);
        setShowResultModal(true);
      };

      text = 'Se resultat';
    } else {
      onClick = () => {
        setcurrentAssignmentIndex((old) => old + 1);
        setShowAssignmentModal(false);
      };

      text = 'Nästa fråga';
    }

    return <Button text={text} onClick={onClick} />;
  };

  const handleReset = () => {
    mapAssignments();
    setcurrentAssignmentIndex(0);
    setHearts(3);
    setShowAssignmentModal(false);
    setShowResultModal(false);
  };

  return (
    <>
      {showAssignmentModal && (
        <Modal>
          <div className='flex justify-center items-center gap-1'>
            {currentAssignment.answeredCorrectly ? (
              <>
                <FaCheck className='text-green-500' />
                <h1 className='text-xl'>Ditt svar är korrekt!</h1>
              </>
            ) : (
              <>
                <IoCloseSharp className='text-red-500 text-2xl' />
                <h1 className='text-xl'>Ditt svar är inkorrekt.</h1>
              </>
            )}
          </div>
          <div className='flex flex-col gap-2'>
            <h2 className='font-bold'>Lösning:</h2>
            <p>{currentAssignment.solutionText}</p>
          </div>
          {checkForAnswers() && (
            <h2 className='text-xl text-center'>
              Du har besvarat alla frågor!
            </h2>
          )}
          {nextButton()}
        </Modal>
      )}
      {showResultModal && (
        <ResultModal
          assignments={assignments}
          handleReset={handleReset}
          gameOver={hearts === 0}
        />
      )}
      <div className='flex h-full gap-2 items-center'>
        <div className='flex h-2 w-full gap-2'>{generateProgressBar()}</div>
        <div className='flex gap-1 h-4 items-center text-rose-500 text-lg'>
          {hearts === 0 ? <FaHeartBroken /> : <FaHeart />}
          {hearts}
        </div>
      </div>
      <p className='h-full overflow-auto'>{currentAssignment.questionText}</p>
      <ul className='h-full flex flex-col gap-2'>
        {currentAssignment.answerOptions.map((answer, index) => {
          let selected = false;

          if (currentAssignment.userAnswer === index) {
            selected = true;
          }

          return (
            <AnswerButton
              text={answer.text}
              selected={selected}
              key={`answer-button-${index}`}
              disabled={currentAssignment.userAnswerChecked}
              handleSelectAnswer={() => {
                handleSelectAnswer(index);
              }}
            />
          );
        })}
        <Button
          onClick={handleCheckAnswer}
          disabled={
            currentAssignment.userAnswer === null ||
            currentAssignment.userAnswerChecked
          }
          text={currentAssignment.userAnswerChecked ? 'Besvarad' : 'Check'}
          styling='mt-8'
        />
      </ul>
      <div className='h-full grid grid-cols-[2rem_auto_3rem] justify-between'>
        <div className='w-8 h-8'>
          {currentAssignment.hints && (
            <Hints hints={currentAssignment.hints}></Hints>
          )}
        </div>

        {currentAssignment.userAnswerChecked && (
          <>
            {currentAssignment.answeredCorrectly ? (
              <Badge styling='bg-green-200 border-green-300'>
                <FaCheck className='text-green-500' />
                <p>Ditt svar är korrekt!</p>
              </Badge>
            ) : (
              <Badge styling='bg-red-200 border-red-300'>
                <IoCloseSharp className='text-red-500 text-2xl' />
                <p>Ditt svar är inkorrekt.</p>
              </Badge>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Gameboard;
