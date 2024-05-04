'use client';

import { useCallback, useEffect, useState } from 'react';
import { FaCheck, FaHeart } from 'react-icons/fa';
import AnswerButton from './AnswerButton';
import Hints from './Hints';
import Button from './Button';
import { IoCloseSharp } from 'react-icons/io5';
import Badge from './Badge';
import ResultModal from './ResultModal';
import AssignmentModal from './AssignmentModal';

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
        let nextAssignment = null;
        let assignmentIndex = currentAssignmentIndex + 1;

        while (nextAssignment === null) {
          if (assignmentIndex >= assignments.length) {
            assignmentIndex = 0;
          }

          if (!assignments[assignmentIndex].userAnswerChecked) {
            nextAssignment = assignmentIndex;
          } else {
            assignmentIndex++;
          }
        }
        setcurrentAssignmentIndex(nextAssignment);
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
        <AssignmentModal
          currentAssignment={currentAssignment}
          checkForAnswers={checkForAnswers}
          nextButton={nextButton()}
        />
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
          <FaHeart />
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
